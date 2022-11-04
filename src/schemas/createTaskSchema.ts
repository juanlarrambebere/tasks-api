import { TaskStatus } from "@prisma/client";
import { z } from "zod";
import { isTaskStatusValid } from "../utils";

const bodySchema = z.object({
  title: z.string({
    required_error: "title is required",
  }),
  description: z.string().optional(),
  status: z
    .string({
      required_error: "status is required",
    })
    .refine(
      isTaskStatusValid,
      `status must be a valid task status (${Object.values(TaskStatus)})`
    )
    .transform((value) => value as TaskStatus),
});

const paramsSchema = z.object({
  userId: z
    .string({
      required_error: "userId is required",
    })
    .refine((value) => !Number.isNaN(parseInt(value)), {
      message: `userId must be a number`,
    }),
});

export const createTaskSchema = z.object({
  body: bodySchema,
  params: paramsSchema,
});

export type CreateTaskRequestBody = z.infer<typeof bodySchema>;
export type CreateTaskRequestParams = z.infer<typeof paramsSchema>;
