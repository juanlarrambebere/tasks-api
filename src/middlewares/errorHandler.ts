import { NextFunction, Request, Response } from "express";
import { ApiError } from "../errors";

const handleError = (
  err: Error,
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  if (err instanceof ApiError) {
    return res.status(err.status).json({
      code: err.name,
      message: err.message,
      details: err.details,
    });
  }

  console.error(err);
  res.status(500).json({ message: "Internal server error" });
};

export default handleError;
