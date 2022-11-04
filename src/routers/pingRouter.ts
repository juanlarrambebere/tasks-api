import express from "express";
import { pingHandler } from "../controllers/pingController";

const router = express.Router();

router.get("/", pingHandler);

export default router;
