import { CreateEmployeeDTO } from "../employee/employee.dtos.js";

export class CreateCompanyDTO {
  name!: string;
  email!: string;
  address!: string;
  color?: string;
  logo?: string;
  employee!: CreateEmployeeDTO;
}
