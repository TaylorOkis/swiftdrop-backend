import { StatusCodes } from "http-status-codes";
import { Request, Response } from "express";

import db from "@/database/db.js";
import asyncWrapper from "@/middlewares/async.js";
import { BadRequestError, NotFoundError } from "@/utils/errors/index.js";
import bcrypt from "bcryptjs";

const createCompany = asyncWrapper(async (req: Request, res: Response) => {
  const { name, company_email, address, color, logo, employee } = req.body;

  if (!employee || typeof employee !== "object") {
    throw new BadRequestError("Employee details are required");
  }

  const {
    username,
    password,
    firstname,
    middlename,
    lastname,
    employee_email,
    phone,
    status,
    image_url,
  } = employee;

  if (!firstname || !lastname || !password || !employee_email || !phone) {
    throw new BadRequestError("Missing required employee fields");
  }

  const existingCompany = await db.company.findUnique({
    where: { name },
  });
  if (existingCompany) {
    throw new BadRequestError("Company already exists");
  }

  const existingEmail = await db.company.findUnique({
    where: { email: company_email },
  });
  if (existingEmail) {
    throw new BadRequestError("Company Email already in use");
  }

  const hashedPassword = bcrypt.hash(password, 10);

  await db.$transaction(async (tx: any) => {
    const { id: company_id } = await tx.company.create({
      data: {
        name,
        email: company_email,
        address,
        color,
        logo,
      },
    });

    await tx.employee.create({
      data: {
        username,
        password: hashedPassword,
        firstname,
        middlename,
        lastname,
        email: employee_email,
        phone,
        role: "ADMIN",
        status,
        image: image_url,
        company_id,
      },
    });
  });

  res
    .status(StatusCodes.CREATED)
    .json({ status: "success", message: "Company Created Successfully" });
});

const getAllCompanies = asyncWrapper(async (req: Request, res: Response) => {
  const company = await db.company.findMany({
    orderBy: { createdAt: "desc" },
  });

  res
    .status(StatusCodes.OK)
    .json({ status: "success", count: company.length, data: company });
});

const getSingleCompany = asyncWrapper(async (req: Request, res: Response) => {
  const { id: companyId } = req.params;

  const existingCompany = await db.company.findUnique({
    where: { id: companyId },
  });

  if (!existingCompany) {
    throw new NotFoundError("Company not Found");
  }

  res.status(StatusCodes.OK).json({ status: "success", data: existingCompany });
});

const updateCompany = asyncWrapper(async (req: Request, res: Response) => {});

const deleteCompany = asyncWrapper(async (req: Request, res: Response) => {
  const { id: companyId } = req.params;

  const existingCompany = await db.company.findUnique({ id: companyId });
  if (existingCompany) {
    throw new NotFoundError("Company not Found");
  }

  await db.company.delete({ where: { id: companyId } });

  res
    .status(StatusCodes.OK)
    .json({ status: "success", message: "Company Deleted Successfully" });
});

export {
  createCompany,
  getAllCompanies,
  getSingleCompany,
  updateCompany,
  deleteCompany,
};
