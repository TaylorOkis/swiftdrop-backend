import express from "express";
import {
  createCompany,
  updateCompany,
  deleteCompany,
} from "@/controllers/company.controller.js";

const mgntRouter = express.Router();

mgntRouter.post("/create", createCompany);
mgntRouter.post("/update", updateCompany);
mgntRouter.get("/delete", deleteCompany);

export default mgntRouter;
