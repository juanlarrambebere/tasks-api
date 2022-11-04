import { NextFunction, Request, Response } from "express";
import { UnauthorizedError } from "../errors";
import { CreateUserRequestBody } from "../schemas/createUserSchema";
import { LoginRequestBody } from "../schemas/loginSchema";
import { login } from "../services/authenticationService";
import { createUser } from "../services/usersService";

export const createUserHandler = async (
  req: Request<{}, {}, CreateUserRequestBody>,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = await createUser(req.body);

    res.status(201).json(user);
  } catch (error) {
    next(error);
  }
};

export const loginHandler = async (
  req: Request<{}, {}, LoginRequestBody>,
  res: Response,
  next: NextFunction
) => {
  try {
    const authData = await login(req.body);
    if (!authData) {
      return next(new UnauthorizedError("Invalid credentials"));
    }

    res.status(200).json(authData);
  } catch (error) {
    next(error);
  }
};
