import express from "express";
import { getUserTasksHandler } from "../controllers/tasksController";
import {
  createUserHandler,
  loginHandler,
} from "../controllers/usersController";
import authenticate from "../middlewares/authentication";
import authorize from "../middlewares/authorization";
import { validateSchema } from "../middlewares/schemaValidator";
import { createUserSchema } from "../schemas/createUserSchema";
import { loginSchema } from "../schemas/loginSchema";

const router = express.Router();

// Public API
router.post("/", validateSchema(createUserSchema), createUserHandler);
router.post("/login", validateSchema(loginSchema), loginHandler);

// Authenticated API
router.get("/:userId/tasks", authenticate, authorize, getUserTasksHandler);

export default router;
