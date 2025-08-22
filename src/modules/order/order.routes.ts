import { Router } from "express";
import { OrderController } from "./order.controller.js";

const orderRouter = Router();
const orderController = new OrderController();

orderRouter
  .route("/")
  .get(orderController.getAllOrders)
  .post(orderController.createOrder);

orderRouter
  .route("/:id")
  .get(orderController.getSingleOrder)
  .delete(orderController.deleteOrder);

export default orderRouter;
