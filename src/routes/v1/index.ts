import { authRoutes } from "@/modules/auth/index.js";
import { companyRoutes } from "@/modules/company/index.js";
import { employeeRoutes } from "@/modules/employee/index.js";
import { orderRoutes } from "@/modules/order/index.js";
import { Router } from "express";

const v1Router = Router();

v1Router.use("/auth", authRoutes);
v1Router.use("/company", companyRoutes);
v1Router.use("/employee", employeeRoutes);
v1Router.use("/order", orderRoutes);

export default v1Router;
