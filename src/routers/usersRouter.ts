import express from "express";
import { createUserHandler } from "../controllers/usersController";
import { validateSchema } from "../middlewares/schemaValidator";
import { createUserSchema } from "../schemas/createUserSchema";

const router = express.Router();

router.post("/", validateSchema(createUserSchema), createUserHandler);

export default router;
