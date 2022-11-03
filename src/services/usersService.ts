import argon2 from "argon2";
import { BadRequestError } from "../errors";
import { isUniqueConstraintViolation, prismaClient } from "../prisma/client";
import { CreateUserRequestBody } from "../schemas/createUserSchema";

export const createUser = async (data: CreateUserRequestBody) => {
  const hashedPassword = await argon2.hash(data.password);

  try {
    const user = await prismaClient.user.create({
      data: {
        username: data.username,
        password: hashedPassword,
      },
    });

    const { password, ...passwordlessUser } = user;

    return passwordlessUser;
  } catch (e) {
    if (isUniqueConstraintViolation(e)) {
      throw new BadRequestError(
        "The username is already in use by another user"
      );
    }

    throw e;
  }
};
