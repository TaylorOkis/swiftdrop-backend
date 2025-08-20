import { Request, Response, NextFunction } from "express";

const asyncWrapper = (callBack: Function) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await callBack(req, res, next);
    } catch (error) {
      next(error);
    }
  };
};

export default asyncWrapper;
