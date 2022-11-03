import { NextFunction, Request, Response } from "express";
import { AnyZodObject, ZodError } from "zod";
import { BadRequestError } from "../errors";

export const validateSchema =
  (schema: AnyZodObject) =>
  (req: Request, _res: Response, next: NextFunction) => {
    const { body, params, query } = req;

    try {
      schema.parse({
        body,
        params,
        query,
      });
      next();
    } catch (error) {
      next(new BadRequestError("Invalid schema", (error as ZodError).errors));
    }
  };
