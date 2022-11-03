import { NextFunction, Request, Response } from "express";
import { ForbiddenError } from "../errors";

const FIVE_MINUTES = 5 * 60 * 1000;

const isTokenExpired = (accessToken: AccessToken) =>
  new Date().getTime() - accessToken.signedAt.getTime() > FIVE_MINUTES;

const authorize = (
  req: Request<{ userId: string }, {}, {}>,
  _res: Response,
  next: NextFunction
) => {
  const accessToken = req.accessToken;

  // Authentication must preceed authorization
  if (!accessToken) {
    return next(new Error("Can't perform authorization before authentication"));
  }

  // The accessToken must have been signed in the last 5 minutes
  if (isTokenExpired(accessToken)) {
    return next(new ForbiddenError("The access token has expired"));
  }

  // The userId from the URL must match the one enconded in the accessToken
  const userId = parseInt(req.params.userId);
  if (accessToken.userId !== userId) {
    return next(new ForbiddenError("Can't perform this opperation"));
  }

  next();
};

export default authorize;
