import { Request, Response } from "express";

import asyncWrapper from "@/middlewares/async.js";

const createEmployee = asyncWrapper(async (req: Request, res: Response) => {});

const getAllEmployees = asyncWrapper(async (req: Request, res: Response) => {});

const getSingleEmployee = asyncWrapper(
  async (req: Request, res: Response) => {}
);

const updateEmployee = asyncWrapper(async (req: Request, res: Response) => {});

const deleteEmployee = asyncWrapper(async (req: Request, res: Response) => {});

export {
  createEmployee,
  getAllEmployees,
  getSingleEmployee,
  updateEmployee,
  deleteEmployee,
};
