import { Task } from "@prisma/client";
import { NextFunction, Request, Response } from "express";
import {
  CreateTaskRequestBody,
  CreateTaskRequestParams,
} from "../schemas/createTaskSchema";
import { GetTasksRequestParams } from "../schemas/getTasksSchema";
import {
  UpdateTaskRequestBody,
  UpdateTaskRequestParams,
} from "../schemas/updateTaskSchema";
import { createTask, getUserTasks, updateTask } from "../services/tasksSevice";

export const createTaskHandler = async (
  req: Request<CreateTaskRequestParams, Task, CreateTaskRequestBody>,
  res: Response,
  next: NextFunction
) => {
  const userId = parseInt(req.params.userId);

  try {
    const task = await createTask(userId, req.body);

    res.status(201).json(task);
  } catch (error) {
    next(error);
  }
};

export const updateTaskHandler = async (
  req: Request<UpdateTaskRequestParams, Task, UpdateTaskRequestBody>,
  res: Response,
  next: NextFunction
) => {
  const userId = parseInt(req.params.userId);
  const taskId = parseInt(req.params.taskId);

  try {
    const task = await updateTask(userId, taskId, req.body);

    res.status(200).json(task);
  } catch (error) {
    next(error);
  }
};

export const getUserTasksHandler = async (
  req: Request<GetTasksRequestParams, Task[], unknown>,
  res: Response,
  next: NextFunction
) => {
  const userId = parseInt(req.params.userId);

  try {
    const tasks = await getUserTasks(userId);

    res.status(200).json(tasks);
  } catch (error) {
    next(error);
  }
};
