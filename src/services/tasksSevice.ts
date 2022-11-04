import { Task } from "@prisma/client";
import { ForbiddenError, NotFoundError } from "../errors";
import { prismaClient } from "../prisma/client";
import { CreateTaskRequestBody } from "../schemas/createTaskSchema";
import { UpdateTaskRequestBody } from "../schemas/updateTaskSchema";

export const createTask = async (
  userId: number,
  data: CreateTaskRequestBody
): Promise<Task> => {
  return await prismaClient.task.create({
    data: {
      ...data,
      user: {
        connect: { id: userId },
      },
    },
  });
};

export const updateTask = async (
  userId: number,
  taskId: number,
  data: UpdateTaskRequestBody
) => {
  const task = await prismaClient.task.findFirst({
    where: {
      id: taskId,
    },
  });

  if (!task) {
    throw new NotFoundError("The task doesn't exist");
  }

  if (task.userId !== userId) {
    throw new ForbiddenError("Can't manipulate tasks from other users");
  }

  return await prismaClient.task.update({
    where: {
      id: taskId,
    },
    data,
  });
};

export const getUserTasks = async (userId: number): Promise<Task[]> => {
  return await prismaClient.task.findMany({
    where: { userId },
  });
};
