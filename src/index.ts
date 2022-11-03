import "dotenv/config";
import express from "express";
import errorHandler from "./middlewares/errorHandler";
import usersRouter from "./routers/usersRouter";

const APP_PORT = process.env.APP_PORT;

const app = express();

app.use(express.json());

app.use("/users", usersRouter);

app.use(errorHandler);

app.listen(APP_PORT, async () => {
  console.log(`Server running in http://localhost:${APP_PORT}`);
});
