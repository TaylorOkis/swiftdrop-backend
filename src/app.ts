import express, { Request, Response } from "express";
import cors from "cors";
import errorHandler from "@/middlewares/error-handler.js";
import notFound from "./middlewares/not-found.js";
import { StatusCodes } from "http-status-codes";

const app = express();

app.use(express.json());
app.use(cors());

app.use(asyncWrpper());

app.get("/", (req: Request, res: Response) => {
  res
    .status(StatusCodes.CREATED)
    .send("Hello, Welcome! This API is running perfectly.");
});

app.use(notFound);
app.use(errorHandler);

export default app;
function asyncWrpper(): any {
  throw new Error("Function not implemented.");
}
