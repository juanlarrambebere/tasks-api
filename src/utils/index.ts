import { TaskStatus } from "@prisma/client";

export function exclude<T, Key extends keyof T>(
  object: T,
  ...keys: Key[]
): Omit<T, Key> {
  for (let key of keys) {
    delete object[key];
  }

  return object;
}

export const isTaskStatusValid = (value: string) =>
  Object.values(TaskStatus).includes(value as TaskStatus);
