import db from "@/database/db.js";
import { StatusCodes } from "http-status-codes";
import { Request, Response } from "express";

import asyncWrapper from "@/middlewares/async.js";
import { BadRequestError, NotFoundError } from "@/utils/errors/index.js";

const createCompany = asyncWrapper(async (req: Request, res: Response) => {
  const { name, email, address, color, logo } = req.body;

  const existingCompany = await db.company.findUnique({
    where: { name },
  });

  if (existingCompany) {
    throw new BadRequestError("Company already exists");
  }

  const existingEmail = await db.company.findUnique({ where: { email } });

  if (existingEmail) {
    throw new BadRequestError("Company Email already in use");
  }

  await db.company.create({
    data: {
      name,
      email,
      address,
      color,
      logo,
    },
  });

  res
    .status(StatusCodes.CREATED)
    .json({ status: "success", message: "Company Created Successfully" });
});

const updateCompany = asyncWrapper(async (req: Request, res: Response) => {});

const deleteCompany = asyncWrapper(async (req: Request, res: Response) => {
  const { id: companyId } = req.params;

  const existingCompany = await db.company.findUnique({ id: companyId });
  if (existingCompany) {
    throw new NotFoundError("Company not Found");
  }

  await db.company.delete({ where: companyId });

  res
    .status(StatusCodes.OK)
    .json({ status: "success", message: "Company Deleted Successfully" });
});

export { createCompany, updateCompany, deleteCompany };
