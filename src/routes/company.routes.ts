import express from "express";
import {
  createCompany,
  getAllCompanies,
  getSingleCompany,
  updateCompany,
  deleteCompany,
} from "@/controllers/company.controller.js";

const companyRouter = express.Router();

companyRouter.route("/").post(createCompany).get(getAllCompanies);

companyRouter
  .route("/:id")
  .get(getSingleCompany)
  .patch(updateCompany)
  .delete(deleteCompany);

export default companyRouter;
