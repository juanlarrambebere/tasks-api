import { NextFunction, Request, Response } from "express";

export const pingHandler = (
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  res.status(200).send("pong");
};
