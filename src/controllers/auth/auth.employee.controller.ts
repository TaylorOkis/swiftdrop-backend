import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import { StatusCodes } from "http-status-codes";

import db from "@/database/db.js";
import asyncWrapper from "@/middlewares/async.js";
import { UnauthenticatedError } from "@/utils/errors/index.js";
import attachAuthCookieToResponse from "@/utils/cookies/access-cookies.js";

const signInEmployee = asyncWrapper(async (req: Request, res: Response) => {
  const { username, email, password } = req.body;
  const errorMessage = "Wrong email or password";

  const existingEmployee = await db.employee.findFirtst({
    where: { OR: [{ username }, { email }] },
    select: {
      id: true,
      username: true,
      password: true,
      role: true,
      status: true,
      email: true,
      company_id: true,
    },
  });

  if (!existingEmployee) {
    throw new UnauthenticatedError(errorMessage);
  }

  const passwordMatch = await bcrypt.compare(
    password,
    existingEmployee.password
  );
  if (!passwordMatch) {
    throw new UnauthenticatedError(errorMessage);
  }

  const userToken = {
    id: existingEmployee.id,
    role: existingEmployee.role,
    company_id: existingEmployee.company_id,
  };

  attachAuthCookieToResponse({ res, user: userToken });

  res
    .status(StatusCodes.OK)
    .json({ status: "success", message: "Login Successfully" });
});

const logOutEmployee = asyncWrapper(async (req: Request, res: Response) => {
  res.clearCookie("authToken");
  res
    .status(StatusCodes.OK)
    .json({ status: "success", message: "Logged out successfully" });
});

export { signInEmployee, logOutEmployee };
