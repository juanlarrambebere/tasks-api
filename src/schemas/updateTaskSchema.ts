import { z } from "zod";

const bodySchema = z
  .object({
    title: z.string(),
    description: z.string(),
    status: z.string(),
  })
  .partial()
  .refine(
    (data) => data.title || data.description || data.status,
    "At least a filed must be provided"
  );

const paramsSchema = z.object({
  userId: z
    .string({
      required_error: "userId is required",
    })
    .refine((value) => !Number.isNaN(parseInt(value)), {
      message: `userId must be a number`,
    }),
  taskId: z
    .string({
      required_error: "taskId is required",
    })
    .refine((value) => !Number.isNaN(parseInt(value)), {
      message: `userId must be a number`,
    }),
});

export const updateTaskSchema = z.object({
  body: bodySchema,
  params: paramsSchema,
});

export type UpdateTaskRequestBody = z.infer<typeof bodySchema>;
export type UpdateTaskRequestParams = z.infer<typeof paramsSchema>;
