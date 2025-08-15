import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";

import asyncWrapper from "@/middlewares/async.js";
import { BadRequestError, NotFoundError } from "@/utils/errors/index.js";
import db from "@/database/db.js";

const createEmployee = asyncWrapper(async (req: Request, res: Response) => {
  const {
    username,
    password,
    firstname,
    middlename,
    lastname,
    email,
    phone,
    role,
    status,
    image_url,
    company_id,
  } = req.body;

  if (
    !firstname ||
    !lastname ||
    !password ||
    !email ||
    !phone ||
    !company_id ||
    !role
  ) {
    throw new BadRequestError("Missing required employee fields");
  }

  const existingUniqueDetailsInCompany = await db.employee.findFirst({
    where: {
      AND: [
        { company_id: company_id },
        { OR: [{ phone: phone, email: email }] },
      ],
    },
  });
  if (existingUniqueDetailsInCompany) {
    throw new BadRequestError("Email or Phone number already in use");
  }

  await db.employee.create({
    data: {
      username,
      password,
      firstname,
      middlename,
      lastname,
      email,
      phone,
      role,
      status,
      image_url,
      company_id,
    },
  });

  res.status(StatusCodes.CREATED).json({
    status: "success",
    message: "Employee account created successfully",
  });
});

const getAllEmployees = asyncWrapper(async (req: Request, res: Response) => {
  const employees = await db.employee.findMany({
    orderBy: { createdAt: "desc" },
  });

  res
    .status(StatusCodes.OK)
    .json({ status: "success", count: employees.length, data: employees });
});

const getSingleEmployee = asyncWrapper(async (req: Request, res: Response) => {
  const { id: employeeId } = req.params;

  const employee = await db.employee.findUnique({
    where: { id: employeeId },
    include: { company: true },
  });

  res.status(StatusCodes.OK).json({ status: "success", data: employee });
});

const updateEmployee = asyncWrapper(async (req: Request, res: Response) => {});

const deleteEmployee = asyncWrapper(async (req: Request, res: Response) => {
  const { id: employeeId } = req.params;

  const existingEmployee = await db.employee.findUnique({
    where: { id: employeeId },
    select: { id: true },
  });
  if (!existingEmployee) {
    throw new NotFoundError("Employee record not found");
  }

  await db.employee.delete({ where: { id: existingEmployee.id } });

  res
    .status(StatusCodes.OK)
    .json({ status: "success", message: "Employee data deleted successfully" });
});

export {
  createEmployee,
  getAllEmployees,
  getSingleEmployee,
  updateEmployee,
  deleteEmployee,
};
