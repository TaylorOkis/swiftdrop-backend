import { authRoutes } from "@/modules/auth/index.js";
import { companyRoutes } from "@/modules/company/index.js";
import { employeeRoutes } from "@/modules/employee/index.js";
import { Router } from "express";

const v1Router = Router();

v1Router.use("/auth", authRoutes);
v1Router.use("/company", companyRoutes);
v1Router.use("/employee", employeeRoutes);

export default v1Router;
