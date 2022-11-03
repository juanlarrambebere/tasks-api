import argon2 from "argon2";
import jwt from "jsonwebtoken";
import { BadRequestError } from "../errors";
import { isUniqueConstraintViolation, prismaClient } from "../prisma/client";
import { CreateUserRequestBody } from "../schemas/createUserSchema";
import { LoginRequestBody } from "../schemas/loginSchema";

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

export const login = async (data: LoginRequestBody) => {
  const user = await prismaClient.user.findUnique({
    where: {
      username: data.username,
    },
  });

  if (!user) {
    return null;
  }

  const isPasswordCorrect = await argon2.verify(user.password, data.password);
  if (!isPasswordCorrect) {
    return null;
  }

  const accessToken = jwt.sign(
    {
      userId: user.id,
      signedAt: new Date(),
    },
    process.env.AUTHENTICATION_SECRET!
  );

  await prismaClient.user.update({
    where: { id: user.id },
    data: { accessToken },
  });

  return accessToken;
};

export const decodeAccessToken = async (encodedAccessToken: string) => {
  let tokenRaw: AccessTokenRaw;

  try {
    tokenRaw = <AccessTokenRaw>(
      jwt.verify(encodedAccessToken, process.env.AUTHENTICATION_SECRET!)
    );
  } catch (_error) {
    return null;
  }

  const user = await prismaClient.user.findUnique({
    where: {
      id: tokenRaw.userId,
    },
  });

  const isTokenValid = !!user && user.accessToken === encodedAccessToken;

  if (!isTokenValid) return null;

  return {
    userId: tokenRaw.userId,
    signedAt: new Date(tokenRaw.signedAt),
  };
};
