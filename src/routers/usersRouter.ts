import express from "express";
import {
  createTaskHandler,
  getUserTasksHandler,
  updateTaskHandler,
} from "../controllers/tasksController";
import {
  createUserHandler,
  loginHandler,
} from "../controllers/usersController";
import authenticate from "../middlewares/authentication";
import authorize from "../middlewares/authorization";
import { validateSchema } from "../middlewares/schemaValidator";
import { createTaskSchema } from "../schemas/createTaskSchema";
import { createUserSchema } from "../schemas/createUserSchema";
import { loginSchema } from "../schemas/loginSchema";
import { updateTaskSchema } from "../schemas/updateTaskSchema";

const router = express.Router();

// Public API
router.post("/", validateSchema(createUserSchema), createUserHandler);
router.post("/login", validateSchema(loginSchema), loginHandler);

// Authenticated API
router.post(
  "/:userId/tasks",
  authenticate,
  authorize,
  validateSchema(createTaskSchema),
  createTaskHandler
);
router.put(
  "/:userId/tasks/:taskId",
  authenticate,
  authorize,
  validateSchema(updateTaskSchema),
  updateTaskHandler
);
router.get("/:userId/tasks", authenticate, authorize, getUserTasksHandler);

export default router;
