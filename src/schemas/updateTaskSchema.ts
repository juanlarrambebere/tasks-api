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

export const updateTaskSchema = z.object({
  body: bodySchema,
});

export type UpdateTaskRequestBody = z.infer<typeof bodySchema>;
