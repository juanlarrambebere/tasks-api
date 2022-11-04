import { NextFunction, Request, Response } from "express";
import { CreateTaskRequestBody } from "../schemas/createTaskSchema";
import { createTask, getUserTasks } from "../services/tasksSevice";

export const createTaskHandler = async (
  req: Request<{ userId: string }, {}, CreateTaskRequestBody>,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = parseInt(req.params.userId);

    const task = await createTask(userId, req.body);

    res.status(201).json(task);
  } catch (error) {
    next(error);
  }
};

export const getUserTasksHandler = async (
  req: Request<{ userId: string }, {}, {}>,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = parseInt(req.params.userId);

    const userTasks = await getUserTasks(userId);

    res.status(200).json(userTasks);
  } catch (error) {
    next(error);
  }
};
