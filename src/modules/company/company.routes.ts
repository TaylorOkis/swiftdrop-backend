import { Router } from "express";
import { CompanyController } from "./company.controller.js";
import {
  authenticateUser,
  authorizationPermissions,
} from "@/core/middlewares/auth.middleware.js";

const companyRouter = Router();
const companyController = new CompanyController();

companyRouter
  .route("/")
  .get(
    authenticateUser,
    authorizationPermissions("ADMIN"),
    companyController.getAllCompanies
  )
  .post(companyController.createCompany);

companyRouter
  .route("/:id")
  .get(authenticateUser, companyController.getSingleCompany)
  .patch(
    authenticateUser,
    authorizationPermissions("ADMIN"),
    companyController.updateCompany
  )
  .delete(
    authenticateUser,
    authorizationPermissions("ADMIN"),
    companyController.deleteCompany
  );

export default companyRouter;
