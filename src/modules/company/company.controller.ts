import { StatusCodes } from "http-status-codes";
import { Request, Response } from "express";

import asyncWrapper from "@/core/utils/async.util.js";
import { CompanyService } from "./company.service.js";
import { UnAuthorizedError } from "@/core/errors/error/index.js";

export class CompanyController {
  private companyService = new CompanyService();

  createCompany = asyncWrapper(async (req: Request, res: Response) => {
    const appSecret = req.body.app_secret;
    if (appSecret !== process.env.APP_SECRET)
      throw new UnAuthorizedError(
        "You are not authorized to perform this operation"
      );
    const companyData = await this.companyService.createCompany(req.body);
    res.status(StatusCodes.CREATED).json({
      status: "success",
      message: "Company Created Successfully",
      data: companyData,
    });
  });

  getAllCompanies = asyncWrapper(async (req: Request, res: Response) => {
    const companies = await this.companyService.getAllCompanies();
    res
      .status(StatusCodes.OK)
      .json({ status: "success", count: companies.length, data: companies });
  });

  getSingleCompany = asyncWrapper(async (req: Request, res: Response) => {
    const { id } = req.params;
    const company = await this.companyService.getSingleCompany(id);
    res.status(StatusCodes.OK).json({ status: "success", data: company });
  });

  updateCompany = asyncWrapper(async (req: Request, res: Response) => {});

  deleteCompany = asyncWrapper(async (req: Request, res: Response) => {
    const appSecret = req.body.app_secret;
    if (appSecret !== process.env.APP_SECRET)
      throw new UnAuthorizedError(
        "You are not authorized to perform this operation"
      );

    const { id } = req.params;

    const companyDeleted = await this.companyService.deleteCompany(id);

    res.status(StatusCodes.OK).json({
      status: companyDeleted,
      message: "Company Deleted Successfully",
    });
  });
}
