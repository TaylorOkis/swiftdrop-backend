import { Request, Response, NextFunction } from "express";

import { CustomRequest, UserPayload } from "@/types/types.js";
import { UnauthenticatedError } from "@/utils/errors/index.js";
import { verifyToken } from "@/utils/jwt/jwt.js";

const authenticateUser = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  const errorMessage = "Authentication Failed";
  const token = req.signedCookies.authToken;

  if (!token) {
    throw new UnauthenticatedError(errorMessage);
  }

  try {
    const payload = verifyToken({ token: token }) as UserPayload;
    req.user = {
      id: payload.id,
      role: payload.role,
      company_id: payload.company_id,
    };
    next();
  } catch (error) {
    throw new UnauthenticatedError(errorMessage);
  }
};

export { authenticateUser };
