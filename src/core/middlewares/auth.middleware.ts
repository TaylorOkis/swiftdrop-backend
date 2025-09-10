import { Response, NextFunction } from "express";
import { UnAuthorizedError } from "../errors/error/index.js";
import { CustomRequest } from "../types/types.js";

const authorizationPermissions = (...roles: any) => {
  return (req: CustomRequest, res: Response, next: NextFunction) => {
    if (!roles.includes(req.user!.role)) {
      throw new UnAuthorizedError("UnAuthorized to access this resource");
    }
  };
};

export { authorizationPermissions };
