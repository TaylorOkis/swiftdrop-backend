import express, { Request, Response } from "express";
import cors from "cors";
import { StatusCodes } from "http-status-codes";

import companyRouter from "@/routes/company.routes.js";
import employeeRouter from "@/routes/employee.routes.js";
import notFound from "@/middlewares/not-found.js";
import errorHandler from "./middlewares/error-handler.js";

const app = express();

app.use(express.json());
app.use(cors());

app.get("/", (req: Request, res: Response) => {
  res
    .status(StatusCodes.CREATED)
    .send("Hello, Welcome! This API is running perfectly.");
});

app.use("/company", companyRouter);
app.use("/employee", employeeRouter);

app.use(notFound);
app.use(errorHandler);

export default app;
