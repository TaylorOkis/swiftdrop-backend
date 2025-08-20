import { Request, Response, NextFunction } from "express";
import { NotFoundError } from "../errors/error/index.js";

const notFound = (req: Request, res: Response, next: NextFunction) =>
  next(new NotFoundError("Route not Found"));

export default notFound;
