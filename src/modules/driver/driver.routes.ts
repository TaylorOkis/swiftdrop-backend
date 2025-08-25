import { Router } from "express";
import { DriverController } from "./driver.controller.js";

const driverRouter = Router();
const driverController = new DriverController();

driverRouter.patch("/:id/status", driverController.updateDriverStatus);

driverRouter
  .route("/")
  .post(driverController.createDriverProfile)
  .get(driverController.getAllDrivers);

driverRouter
  .route("/:id")
  .get(driverController.getDriverProfile)
  .patch(driverController.updateDriverProfile);

export default driverRouter;
