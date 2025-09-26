import { Router } from "express";
import { DriverController } from "./driver.controller.js";
import { authorizationPermissions } from "@/core/middlewares/auth.middleware.js";

const driverRouter = Router();
const driverController = new DriverController();

driverRouter.patch("/:id/status", driverController.updateDriverStatus);
driverRouter.get(
  "/company",
  authorizationPermissions("ADMIN", "DISPATCHER"),
  driverController.getAllCompanyDrivers
);

driverRouter
  .route("/")
  .post(authorizationPermissions("ADMIN"), driverController.createDriverProfile)
  .get(
    authorizationPermissions("ADMIN", "DISPATCHER"),
    driverController.getAllDrivers
  );

driverRouter
  .route("/:id")
  .get(driverController.getDriverProfile)
  .patch(
    authorizationPermissions("ADMIN"),
    driverController.updateDriverProfile
  );

export default driverRouter;
