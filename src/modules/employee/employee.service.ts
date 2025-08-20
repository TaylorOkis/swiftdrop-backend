import { BadRequestError, NotFoundError } from "@/core/errors/error/index.js";
import { CreateEmployeeDTO } from "./employee.dtos.js";
import { EmployeeRepository } from "./employee.repository.js";
import { PasswordManager } from "@/core/utils/hash.util.js";
import excludePassword from "@/core/utils/excludePassword.util.js";

export class EmployeeService {
  private employeeRepository = new EmployeeRepository();
  async createEmployee(createEmployeeDTO: CreateEmployeeDTO) {
    const existingUniqueDetailsInCompany =
      await this.employeeRepository.findEmailOrPhoneNumber(
        createEmployeeDTO.company_id!,
        createEmployeeDTO.phone,
        createEmployeeDTO.email
      );
    if (existingUniqueDetailsInCompany) {
      throw new BadRequestError("Email or Phone number already in use");
    }

    const hashedPassword = await PasswordManager.encrypt(
      createEmployeeDTO.password
    );
    createEmployeeDTO.password = hashedPassword;

    const employee = await this.employeeRepository.create(createEmployeeDTO);

    const employeeData = excludePassword(employee);

    return employeeData;
  }

  async getAllEmployees() {
    const employees = await this.employeeRepository.getAll();
    const employeesData = employees.map(excludePassword);

    return employeesData;
  }

  async getAllEmployeesForCompany(company_id: string) {
    const employees = await this.employeeRepository.getAllForCompany(
      company_id
    );
    const employeesData = employees.map(excludePassword);

    return employeesData;
  }

  async getSingleEmployee(id: string) {
    const existingEmployee = await this.employeeRepository.findById(id);
    if (!existingEmployee) {
      throw new NotFoundError("Employee not found");
    }

    const employeeData = excludePassword(existingEmployee);

    return employeeData;
  }

  async updateEmployee() {}

  async deleteEmployee(id: string) {
    const existingEmployee = await this.employeeRepository.findById(id);
    if (!existingEmployee) {
      throw new NotFoundError("Employee not Found");
    }

    await this.employeeRepository.delete(id);

    return "success";
  }
}
