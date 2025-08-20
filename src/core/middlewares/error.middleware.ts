import { Request, Response, NextFunction } from "express";
import errorHandler from "../errors/errorHandler.js";
import { AppError } from "../errors/error/index.js";

export default function errorMiddleware(
  err: Error | AppError,
  req: Request,
  res: Response,
  next: NextFunction
) {
  errorHandler(err, req, res, next);
}
