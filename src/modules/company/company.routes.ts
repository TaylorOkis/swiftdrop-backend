import { Router } from "express";
import { CompanyController } from "./company.controller.js";
import { authenticateUser } from "@/core/middlewares/auth.middleware.js";

const companyRouter = Router();
const companyController = new CompanyController();

companyRouter
  .route("/")
  .get(authenticateUser, companyController.getAllCompanies)
  .post(companyController.createCompany);

companyRouter
  .route("/:id")
  .get(authenticateUser, companyController.getSingleCompany)
  .patch(authenticateUser, companyController.updateCompany)
  .delete(authenticateUser, companyController.deleteCompany);

export default companyRouter;
