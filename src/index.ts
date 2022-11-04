import "dotenv/config";
import express from "express";
import errorHandler from "./middlewares/errorHandler";
import pingRouter from "./routers/pingRouter";
import usersRouter from "./routers/usersRouter";

const PORT = process.env.PORT;

const app = express();

app.use(express.json());

app.use("/ping", pingRouter);
app.use("/users", usersRouter);

app.use(errorHandler);

app.listen(PORT, async () => {
  console.log(`Server running in http://localhost:${PORT}`);
});
