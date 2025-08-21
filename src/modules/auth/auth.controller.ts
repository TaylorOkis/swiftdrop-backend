import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";

import { AuthService } from "./auth.service.js";
import asyncWrapper from "@/core/utils/async.util.js";
import attachAuthCookieToResponse from "@/core/utils/cookies.util.js";

export class AuthController {
  private authSerivce = new AuthService();

  login = asyncWrapper(async (req: Request, res: Response) => {
    const employeeData = await this.authSerivce.getEmployeeData(req.body);
    attachAuthCookieToResponse({ res, user: employeeData });
    res
      .status(StatusCodes.OK)
      .json({ status: "success", message: "Login Successfully" });
  });

  logOut = asyncWrapper(async (req: Request, res: Response) => {
    res.clearCookie("authToken");
    res
      .status(StatusCodes.OK)
      .json({ status: "success", message: "Logged out successfully" });
  });
}
