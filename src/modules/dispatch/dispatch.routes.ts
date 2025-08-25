import { Router } from "express";
import { DispatchController } from "./dispatch.controller.js";

const dispatchRouter = Router();
const dispatchController = new DispatchController();

dispatchRouter.post("/assign", dispatchController.assignDriver);
dispatchRouter.post("/statusUpdate", dispatchController.updateOrderStatus);

export default dispatchRouter;
