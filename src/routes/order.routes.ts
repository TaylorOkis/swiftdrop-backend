import express from "express";
import { createOrder, assignOrder } from "@/controllers/order.controller.js";

const orderRouter = express.Router();

orderRouter.route("/").post(createOrder);
orderRouter.post("/assign", assignOrder);

export default orderRouter;
