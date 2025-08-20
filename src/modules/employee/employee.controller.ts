import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";

import asyncWrapper from "@/core/utils/async.util.js";
import { EmployeeService } from "./employee.service.js";

export class EmployeeController {
  private employeeService = new EmployeeService();

  createEmployee = asyncWrapper(async (req: Request, res: Response) => {
    const employeeData = this.employeeService.createEmployee(req.body);
    res.status(StatusCodes.CREATED).json({
      status: "success",
      message: "Employee Created Successfully",
      data: employeeData,
    });
  });

  getAllEmployees = asyncWrapper(async (req: Request, res: Response) => {
    const employees = await this.employeeService.getAllEmployees();
    res
      .status(StatusCodes.OK)
      .json({ status: "success", count: employees.length, data: employees });
  });

  getSingleEmployee = asyncWrapper(async (req: Request, res: Response) => {
    const { id } = req.params;
    const employee = await this.employeeService.getSingleEmployee(id);
    res.status(StatusCodes.OK).json({ status: "success", data: employee });
  });

  updateEmployee = asyncWrapper(async (req: Request, res: Response) => {});

  deleteEmployee = asyncWrapper(async (req: Request, res: Response) => {
    const { id } = req.params;

    const employeeDeleted = await this.employeeService.deleteEmployee(id);

    res.status(StatusCodes.OK).json({
      status: employeeDeleted,
      message: "Employee Deleted Successfully",
    });
  });
}
