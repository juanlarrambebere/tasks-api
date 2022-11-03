import { z } from "zod";

const bodySchema = z.object({
  username: z.string({
    required_error: "username is required",
  }),
  password: z.string({
    required_error: "password is required",
  }),
});

export const loginSchema = z.object({
  body: bodySchema,
});

export type LoginRequestBody = z.infer<typeof bodySchema>;
