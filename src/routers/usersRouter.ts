import express from "express";
import {
  createUserHandler,
  loginHandler,
} from "../controllers/usersController";
import { validateSchema } from "../middlewares/schemaValidator";
import { createUserSchema } from "../schemas/createUserSchema";
import { loginSchema } from "../schemas/loginSchema";

const router = express.Router();

router.post("/", validateSchema(createUserSchema), createUserHandler);
router.post("/login", validateSchema(loginSchema), loginHandler);

export default router;
