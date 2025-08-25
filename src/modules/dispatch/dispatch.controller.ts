import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";

import asyncWrapper from "@/core/utils/async.util.js";
import { DispatchService } from "./dispatch.service.js";

export class DispatchController {
  private dispatchService = new DispatchService();

  assignDriver = asyncWrapper(async (req: Request, res: Response) => {
    const updatedOrder = await this.dispatchService.assignDriverToOrder(
      req.body
    );
    res.status(StatusCodes.OK).json({
      status: "success",
      message: "Driver assigned Successfully",
      data: updatedOrder,
    });
  });

  updateOrderStatus = asyncWrapper(async (req: Request, res: Response) => {
    const updatedOrder = await this.dispatchService.updateOrderStatus(req.body);
    res.status(StatusCodes.OK).json({
      status: "success",
      message: "Status Updated Successfully",
      data: updatedOrder,
    });
  });
}
