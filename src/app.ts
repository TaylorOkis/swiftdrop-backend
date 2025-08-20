import express, { Request, Response } from "express";
import cors from "cors";
import { StatusCodes } from "http-status-codes";

import v1Router from "./routes/v1/index.js";
import notFound from "./core/middlewares/notFound.middleware.js";
import errorMiddleware from "./core/middlewares/error.middleware.js";

const app = express();

app.use(express.json());
app.use(cors());

app.get("/health", (req: Request, res: Response) => {
  res
    .status(StatusCodes.CREATED)
    .send("Hello, Welcome! This API is running perfectly.");
});

app.use("/api/v1", v1Router);

app.use(notFound);
app.use(errorMiddleware);

export default app;
