import { NextFunction, Request, Response } from "express";
import { CreateUserInput } from "../schemas/createUserSchema";
import { createUser } from "../services/usersService";

export const createUserHandler = async (
  req: Request<{}, {}, CreateUserInput>,
  res: Response,
  next: NextFunction
) => {
  const userInput = req.body;

  try {
    const user = await createUser(userInput);

    res.status(201).json(user);
  } catch (error) {
    next(error);
  }
};
