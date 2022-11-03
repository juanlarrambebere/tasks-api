import "dotenv/config";
import express from "express";

const APP_PORT = process.env.APP_PORT;

const app = express();

app.use(express.json());

app.listen(APP_PORT, async () => {
  console.log(`Server running in http://localhost:${APP_PORT}`);
});
