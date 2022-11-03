import { NextFunction, Request, Response } from "express";
import { getUserTasks } from "../services/tastsSevice";

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
