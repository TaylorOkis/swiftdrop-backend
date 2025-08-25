import { Request, Response } from "express";

import asyncWrapper from "@/core/utils/async.util.js";
import { DriverService } from "./driver.service.js";
import { StatusCodes } from "http-status-codes";

export class DriverController {
  private driverService = new DriverService();

  createDriverProfile = asyncWrapper(async (req: Request, res: Response) => {
    const driverProfile = await this.driverService.createDriverProfile(
      req.body
    );

    res.status(StatusCodes.CREATED).json({
      status: "success",
      messsage: "Driver profile created successfully",
      data: driverProfile,
    });
  });

  getAllDrivers = asyncWrapper(async (req: Request, res: Response) => {
    const driversProfiles = await this.driverService.getAllDrivers();
    res.status(StatusCodes.OK).json({
      status: "success",
      message: "Drivers profiles fetched successfully",
      data: driversProfiles,
    });
  });

  getAllCompanyDrivers = asyncWrapper(async (req: Request, res: Response) => {
    const companyDriversProfiles =
      await this.driverService.getAllDriversForCompany(req.body.company_id);

    res.status(StatusCodes.OK).json({
      status: "success",
      message: "Drivers profiles for company fetched successfully",
      data: companyDriversProfiles,
    });
  });

  getDriverProfile = asyncWrapper(async (req: Request, res: Response) => {
    const driverProfile = await this.driverService.getSingleDriver(
      req.body.driver_id
    );

    res.status(StatusCodes.OK).json({
      status: "success",
      message: "Driver profile fetched successfully",
      data: driverProfile,
    });
  });

  updateDriverProfile = asyncWrapper(async (req: Request, res: Response) => {
    const updatedProfile = await this.driverService.updateDriver(req.body);

    res.status(StatusCodes.OK).json({
      status: "success",
      message: "Driver profile updated successfully",
      data: updatedProfile,
    });
  });

  updateDriverStatus = asyncWrapper(async (req: Request, res: Response) => {
    const statusUpdate = await this.driverService.updateDriverStatus(req.body);

    res.status(StatusCodes.OK).json({
      status: "success",
      message: "Driver status updated successfully",
      data: statusUpdate,
    });
  });
}
