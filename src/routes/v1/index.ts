import { authRoutes } from "@/modules/auth/index.js";
import { companyRoutes } from "@/modules/company/index.js";
import { dispatchRoutes } from "@/modules/dispatch/index.js";
import { driverRoutes } from "@/modules/driver/index.js";
import { employeeRoutes } from "@/modules/employee/index.js";
import { orderRoutes } from "@/modules/order/index.js";
import { Router } from "express";

const v1Router = Router();

v1Router.use("/auth", authRoutes);
v1Router.use("/company", companyRoutes);
v1Router.use("/employee", employeeRoutes);
v1Router.use("/order", orderRoutes);
v1Router.use("/dispatch", dispatchRoutes);
v1Router.use("/driver", driverRoutes);

export default v1Router;
