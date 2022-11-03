import { NextFunction, Request, Response } from "express";
import { UnauthorizedError } from "../errors";
import { decodeAccessToken } from "../services/usersService";

const ACCESS_TOKEN_HEADER_NAME = "X-Access-Token";

const authenticate = async (
  req: Request,
  _res: Response,
  next: NextFunction
) => {
  const encodedAccessToken = req.header(ACCESS_TOKEN_HEADER_NAME);
  if (!encodedAccessToken) {
    return next(new UnauthorizedError("Access token is missing"));
  }

  const accessToken = await decodeAccessToken(encodedAccessToken);
  if (!accessToken) {
    return next(new UnauthorizedError("Access token is invalid"));
  }

  req.accessToken = accessToken;
  next();
};

export default authenticate;
