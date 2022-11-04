import express from "express";
import {
  createTaskHandler,
  getUserTasksHandler,
  updateTaskHandler,
} from "../controllers/tasksController";
import { validateSchema } from "../middlewares/schemaValidator";
import { createTaskSchema } from "../schemas/createTaskSchema";
import { getTasksSchema } from "../schemas/getTasksSchema";
import { updateTaskSchema } from "../schemas/updateTaskSchema";

const router = express.Router({ mergeParams: true });

router.get("/", validateSchema(getTasksSchema), getUserTasksHandler);
router.post("/", validateSchema(createTaskSchema), createTaskHandler);
router.put("/:taskId", validateSchema(updateTaskSchema), updateTaskHandler);

export default router;
