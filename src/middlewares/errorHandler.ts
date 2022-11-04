import { NextFunction, Request, Response } from "express";
import { ApiError } from "../errors";

const handleError = (
  err: Error,
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  // ApiErrors are intended to reach the end user
  if (err instanceof ApiError) {
    return res.status(err.status).json({
      code: err.name,
      message: err.message,
      details: err.details,
    });
  }

  // Unexpected errors are logged and prevented from reaching the end user
  console.error(err);
  res.status(500).json({ message: "Internal server error" });
};

export default handleError;
