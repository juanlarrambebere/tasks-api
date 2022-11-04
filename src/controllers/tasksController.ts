import { NextFunction, Request, Response } from "express";
import { CreateTaskRequestBody } from "../schemas/createTaskSchema";
import { UpdateTaskRequestBody } from "../schemas/updateTaskSchema";
import { createTask, getUserTasks, updateTask } from "../services/tasksSevice";

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

export const updateTaskHandler = async (
  req: Request<{ userId: string; taskId: string }, {}, UpdateTaskRequestBody>,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = parseInt(req.params.userId);
    const taskId = parseInt(req.params.taskId);

    const task = await updateTask(userId, taskId, req.body);

    res.status(200).json(task);
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

    const tasks = await getUserTasks(userId);

    res.status(200).json(tasks);
  } catch (error) {
    next(error);
  }
};
