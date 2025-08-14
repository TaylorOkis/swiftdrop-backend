import express, { Request, Response } from "express";
import cors from "cors";
import errorHandler from "@/middlewares/error-handler.js";
import notFound from "./middlewares/not-found.js";

const app = express();

app.use(express.json());
app.use(cors());

app.use(notFound);
app.use(errorHandler);

app.get("/", (req: Request, res: Response) => {
  res.send("Hello, Welcome! This API is running perfectly.");
});

export default app;
