import { Response, NextFunction } from "express";
import {
  UnAuthenticatedError,
  UnAuthorizedError,
} from "../errors/error/index.js";
import { CustomRequest, UserPayload } from "../types/types.js";
import { verifyToken } from "../utils/jwt.util.js";

const authenticateUser = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  const token = req.signedCookies.authToken;
  console.log(`Token: ${token}`);
  if (!token) throw new UnAuthenticatedError("Authentication Failed");

  try {
    const payload = verifyToken({ token }) as UserPayload;
    req.user = payload;
    next();
  } catch (error) {
    throw new UnAuthenticatedError("Authentication Failed");
  }
};

const authorizationPermissions = (...roles: any) => {
  return (req: CustomRequest, res: Response, next: NextFunction) => {
    if (!roles.includes(req.user!.role)) {
      throw new UnAuthorizedError("UnAuthorized to access this resource");
    }
  };
};

export { authorizationPermissions, authenticateUser };
