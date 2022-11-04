import { z } from "zod";

const paramsSchema = z.object({
  userId: z
    .string({
      required_error: "userId is required",
    })
    .refine((value) => !Number.isNaN(parseInt(value)), {
      message: `userId must be a number`,
    }),
});

export const getTasksSchema = z.object({
  params: paramsSchema,
});

export type GetTasksRequestParams = z.infer<typeof paramsSchema>;
