import { Router } from "express";
import { OrderController } from "./order.controller.js";
import { authorizationPermissions } from "@/core/middlewares/auth.middleware.js";

const orderRouter = Router();
const orderController = new OrderController();

orderRouter
  .route("/")
  .get(
    authorizationPermissions("ADMIN", "DISPATCHER"),
    orderController.getAllOrders
  )
  .post(
    authorizationPermissions("ADMIN", "DISPATCHER"),
    orderController.createOrder
  );

orderRouter
  .route("/:id")
  .get(orderController.getSingleOrder)
  .delete(authorizationPermissions("ADMIN"), orderController.deleteOrder);

export default orderRouter;
