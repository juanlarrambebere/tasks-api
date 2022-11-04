import express from "express";
import {
  createUserHandler,
  loginHandler,
} from "../controllers/usersController";
import authenticate from "../middlewares/authentication";
import authorize from "../middlewares/authorization";
import { validateSchema } from "../middlewares/schemaValidator";
import { createUserSchema } from "../schemas/createUserSchema";
import { loginSchema } from "../schemas/loginSchema";
import userTasksRouter from "./userTasksRouter";

const router = express.Router({ mergeParams: true });

// Public API
router.post("/", validateSchema(createUserSchema), createUserHandler);
router.post("/login", validateSchema(loginSchema), loginHandler);

// Authenticated API
router.use("/:userId/tasks", authenticate, authorize, userTasksRouter);

export default router;
