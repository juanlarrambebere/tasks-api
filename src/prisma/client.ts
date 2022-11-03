import { PrismaClient } from "@prisma/client";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime";

export const prismaClient = new PrismaClient();

export const isUniqueConstraintViolation = (e: unknown) =>
  e instanceof PrismaClientKnownRequestError && e.code === "P2002";
