import express from "express";
import {
  createCompany,
  updateCompany,
  deleteCompany,
} from "@/controllers/company.controller.js";

const companyRouter = express.Router();

companyRouter.route("/").post(createCompany);

companyRouter.route("/:id").patch(updateCompany).delete(deleteCompany);

export default companyRouter;
