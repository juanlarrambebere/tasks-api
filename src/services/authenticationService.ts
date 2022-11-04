import argon2 from "argon2";
import jwt from "jsonwebtoken";
import { prismaClient } from "../prisma/client";
import { LoginRequestBody } from "../schemas/loginSchema";

export const login = async (data: LoginRequestBody): Promise<string | null> => {
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

export const decodeAccessToken = async (
  encodedAccessToken: string
): Promise<AccessToken | null> => {
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

  const isLatestToken = !!user && user.accessToken === encodedAccessToken;
  if (!isLatestToken) return null;

  return {
    userId: tokenRaw.userId,
    signedAt: new Date(tokenRaw.signedAt),
  };
};
