import { prismaClient } from "../prisma/client";

export const getUserTasks = async (userId: number) => {
  return await prismaClient.task.findMany({
    where: { userId },
  });
};
