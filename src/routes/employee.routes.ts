import express from "express";
import {
  createEmployee,
  getAllEmployees,
  getSingleEmployee,
  updateEmployee,
  deleteEmployee,
} from "@/controllers/employee.controller.js";

const employeeRouter = express.Router();

employeeRouter.route("/").post(createEmployee).get(getAllEmployees);

employeeRouter
  .route("/:id")
  .get(getSingleEmployee)
  .patch(updateEmployee)
  .delete(deleteEmployee);

export default employeeRouter;
