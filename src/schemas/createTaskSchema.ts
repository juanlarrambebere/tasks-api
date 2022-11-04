import { z } from "zod";

const bodySchema = z.object({
  title: z.string({
    required_error: "title is required",
  }),
  description: z.string().optional(),
  status: z.string({
    required_error: "status is required",
  }),
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
