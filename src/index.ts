import express from "express";
import errorHandler from "./middlewares/errorHandler";
import pingRouter from "./routers/pingRouter";
import usersRouter from "./routers/usersRouter";

const PORT = process.env.PORT;

const app = express();

// Registers express json middleware
app.use(express.json());

// Resgiters the app routers
app.use("/ping", pingRouter);
app.use("/users", usersRouter);

// Registers a custom error handler
app.use(errorHandler);

app.listen(PORT, async () => {
  console.log(`Server running in http://localhost:${PORT}`);
});
