import { CreateEmployeeDTO } from "../employee/employee.dtos.js";

export class CreateCompanyDTO {
  name!: string;
  email!: string;
  address!: string;
  color?: [];
  logo?: string;
  employee!: CreateEmployeeDTO;
}
