import express from "express";
import errorHandler from "./middlewares/errorHandler";
import { notFoundHandler } from "./middlewares/routeNotFoundMiddleware";
import pingRouter from "./routers/pingRouter";
import usersRouter from "./routers/usersRouter";

const PORT = process.env.PORT;

const app = express();

// Registers express json middleware
app.use(express.json());

// Resgiters the app routers
app.use("/ping", pingRouter);
app.use("/users", usersRouter);

// Registers a 404 handler
app.use(notFoundHandler);

// Registers a custom error handler
app.use(errorHandler);

app.listen(PORT, async () => {
  console.log(`Server running in http://localhost:${PORT}`);
});
