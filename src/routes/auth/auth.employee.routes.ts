import express from "express";
import {
  signInEmployee,
  logOutEmployee,
} from "@/controllers/auth/auth.employee.controller.js";
import { authenticateUser } from "@/middlewares/authentication.js";

const employeeAuthRouter = express.Router();

employeeAuthRouter.post("/signIn", signInEmployee);
employeeAuthRouter.get("/employee/logout", authenticateUser, logOutEmployee);

export default employeeAuthRouter;
