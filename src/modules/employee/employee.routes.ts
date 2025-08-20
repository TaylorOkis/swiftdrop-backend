import { Router } from "express";
import { EmployeeController } from "./employee.controller.js";

const employeeRouter = Router();
const employeeController = new EmployeeController();

employeeRouter
  .route("/")
  .get(employeeController.getAllEmployees)
  .post(employeeController.createEmployee);

employeeRouter
  .route("/:id")
  .get(employeeController.getSingleEmployee)
  .patch(employeeController.updateEmployee)
  .delete(employeeController.deleteEmployee);

export default employeeRouter;
