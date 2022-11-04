import { prismaClient } from "../prisma/client";
import { CreateTaskRequestBody } from "../schemas/createTaskSchema";

export const createTask = async (
  userId: number,
  data: CreateTaskRequestBody
) => {
  return await prismaClient.task.create({
    data: {
      ...data,
      user: {
        connect: { id: userId },
      },
    },
  });
};

export const getUserTasks = async (userId: number) => {
  return await prismaClient.task.findMany({
    where: { userId },
  });
};
