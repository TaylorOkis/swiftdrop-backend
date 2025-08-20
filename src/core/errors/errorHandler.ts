import { Request, Response, NextFunction } from "express";
import { StatusCodes } from "http-status-codes";
import { AppError } from "./error/index.js";

const errorHandler = (
  error: Error | AppError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let customError = {
    statusCode:
      error instanceof AppError
        ? error.statusCode
        : StatusCodes.INTERNAL_SERVER_ERROR,
    status: "fail",
    error: error.message || "Something went wrong, please try again",
  };

  res
    .status(customError.statusCode)
    .json({ status: customError.status, error: customError.error });
};

export default errorHandler;
