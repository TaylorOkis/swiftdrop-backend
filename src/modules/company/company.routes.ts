import { Router } from "express";
import { CompanyController } from "./company.controller.js";

const companyRouter = Router();
const companyController = new CompanyController();

companyRouter
  .route("/")
  .get(companyController.getAllCompanies)
  .post(companyController.createCompany);

companyRouter
  .route("/:id")
  .get(companyController.getSingleCompany)
  .patch(companyController.updateCompany)
  .delete(companyController.deleteCompany);

export default companyRouter;
