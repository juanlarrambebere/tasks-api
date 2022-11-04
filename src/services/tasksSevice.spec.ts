import { Task } from "@prisma/client";
import { ForbiddenError, NotFoundError } from "../errors";
import { prismaClient } from "../prisma/client";
import { CreateTaskRequestBody } from "../schemas/createTaskSchema";
import { createTask, getUserTasks, updateTask } from "./tasksSevice";

jest.mock("../prisma/client", () => ({
  prismaClient: {
    task: {
      create: jest.fn(),
      update: jest.fn(),
      findFirst: jest.fn(),
      findMany: jest.fn(),
    },
  },
}));

const theUserId = 1;
const anotherUserId = 2;

describe("taskService", () => {
  afterEach(jest.clearAllMocks);

  describe("createTask", () => {
    const taskData = { title: "title" } as CreateTaskRequestBody;

    it("tries to create a new task in the database, and if it works, it returns the new task's data", async () => {
      const createdTaskData = { id: 1 } as Task;
      jest.mocked(prismaClient.task.create).mockResolvedValue(createdTaskData);

      await createTask(theUserId, taskData);

      expect(prismaClient.task.create).toHaveBeenCalledTimes(1);
      expect(prismaClient.task.create).toHaveBeenCalledWith(
        expect.objectContaining({
          data: {
            ...taskData,
            user: {
              connect: { id: theUserId },
            },
          },
        })
      );
    });

    it("tries to create a new task in the database, and if it fails, it forwards the error", async () => {
      const theError = new Error("A random error");
      jest.mocked(prismaClient.task.create).mockRejectedValue(theError);

      await createTask(theUserId, taskData).catch((error: Error) => {
        expect(error).toEqual(theError);
      });

      expect(prismaClient.task.create).toHaveBeenCalledTimes(1);
    });
  });

  describe("updateTask", () => {
    const taskId = 2;
    const taskData = { status: "TODO" } as CreateTaskRequestBody;

    it("throws a not found error if the task doesn't exist", async () => {
      jest.mocked(prismaClient.task.findFirst).mockResolvedValue(null);

      await updateTask(theUserId, taskId, taskData).catch((error: Error) => {
        expect(error).toBeInstanceOf(NotFoundError);
        expect(error.message).toEqual("The task doesn't exist");
      });

      expect(prismaClient.task.findFirst).toHaveBeenCalledTimes(1);
      expect(prismaClient.task.findFirst).toHaveBeenCalledWith(
        expect.objectContaining({
          where: { id: taskId },
        })
      );

      expect(prismaClient.task.update).not.toHaveBeenCalled();
    });

    it("throws a not forbidden error if the task belongs to another user", async () => {
      const taskFromAnotherUser = {
        userId: anotherUserId,
      } as Task;

      jest
        .mocked(prismaClient.task.findFirst)
        .mockResolvedValue(taskFromAnotherUser);

      await updateTask(theUserId, taskId, taskData).catch((error: Error) => {
        expect(error).toBeInstanceOf(ForbiddenError);
        expect(error.message).toEqual(
          "Can't manipulate tasks from other users"
        );
      });

      expect(prismaClient.task.findFirst).toHaveBeenCalledTimes(1);
      expect(prismaClient.task.findFirst).toHaveBeenCalledWith(
        expect.objectContaining({
          where: { id: taskId },
        })
      );

      expect(prismaClient.task.update).not.toHaveBeenCalled();
    });

    it("updates the task if the task exists and belongs to the user", async () => {
      const taskFromTheUser = {
        userId: theUserId,
      } as Task;

      jest
        .mocked(prismaClient.task.findFirst)
        .mockResolvedValue(taskFromTheUser);

      await updateTask(theUserId, taskId, taskData);

      expect(prismaClient.task.findFirst).toHaveBeenCalledTimes(1);
      expect(prismaClient.task.findFirst).toHaveBeenCalledWith(
        expect.objectContaining({
          where: { id: taskId },
        })
      );

      expect(prismaClient.task.update).toHaveBeenCalledTimes(1);
      expect(prismaClient.task.update).toHaveBeenCalledWith(
        expect.objectContaining({
          where: {
            id: taskId,
          },
          data: taskData,
        })
      );
    });
  });

  describe("getUserTasks", () => {
    it("returns the tasks from the given user", async () => {
      const expectedUserTasks = [{ id: 1 } as Task, { id: 2 } as Task];
      jest
        .mocked(prismaClient.task.findMany)
        .mockResolvedValue(expectedUserTasks);

      const userTasks = await getUserTasks(theUserId);

      expect(prismaClient.task.findMany).toHaveBeenCalledTimes(1);
      expect(prismaClient.task.findMany).toHaveBeenCalledWith(
        expect.objectContaining({
          where: { userId: theUserId },
        })
      );
      expect(userTasks).toEqual(expectedUserTasks);
    });
  });
});
