import { StatusCodes } from "http-status-codes";
import AppError from "./appError.js";

export default class UnAuthenticatedError extends AppError {
  statusCode: StatusCodes;
  constructor(message: string) {
    super(message);
    this.statusCode = StatusCodes.UNAUTHORIZED;
  }
}
