import { companyRoutes } from "@/modules/company/index.js";
import { Router } from "express";
export { companyRoutes } from "@/modules/company/index.js";

const v1Router = Router();

v1Router.use("/company", companyRoutes);

export default v1Router;
