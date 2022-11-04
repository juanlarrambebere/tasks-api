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

export const createTaskSchema = z.object({
  body: bodySchema,
});

export type CreateTaskRequestBody = z.infer<typeof bodySchema>;
