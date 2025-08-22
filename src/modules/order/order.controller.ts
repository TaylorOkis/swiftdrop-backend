import { Request, Response } from "express";

import asyncWrapper from "@/core/utils/async.util.js";
import { OrderService } from "./order.service.js";
import { StatusCodes } from "http-status-codes";

export class OrderController {
  private orderService = new OrderService();

  createOrder = asyncWrapper(async (req: Request, res: Response) => {
    const orderData = await this.orderService.createOrder(req.body);

    res.status(StatusCodes.CREATED).json({
      status: "success",
      message: "Order Created Successfully",
      data: orderData,
    });
  });

  getAllOrders = asyncWrapper(async (req: Request, res: Response) => {
    const orders = await this.orderService.getAllOrders();

    res
      .status(StatusCodes.OK)
      .json({ status: "success", count: orders.length, data: orders });
  });

  getSingleOrder = asyncWrapper(async (req: Request, res: Response) => {
    const { id } = req.params;
    const order = await this.orderService.getSingleOrder(id);
    res.status(StatusCodes.OK).json({ status: "success", data: order });
  });

  deleteOrder = asyncWrapper(async (req: Request, res: Response) => {
    const { id } = req.params;

    const orderDeleted = await this.orderService.deleteOrder(id);

    res
      .status(StatusCodes.OK)
      .json({ status: orderDeleted, message: "Order deleted successfully" });
  });
}
