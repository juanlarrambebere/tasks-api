import { z } from "zod";

const STRONG_PASSWORD_PATTERN =
  /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{8,})/;

const isPasswordSecure = (pwd: string) => STRONG_PASSWORD_PATTERN.test(pwd);

const bodySchema = z.object({
  username: z.string({
    required_error: "username is required",
  }),
  password: z
    .string({
      required_error: "password is required",
    })
    .refine(
      (pwd) => isPasswordSecure(pwd),
      "password must contain at least one number, one uppercase and one lowercase letter, one special character and at least 8 characters long"
    ),
});

export const createUserSchema = z.object({
  body: bodySchema,
});

export type CreateUserRequestBody = z.infer<typeof bodySchema>;
