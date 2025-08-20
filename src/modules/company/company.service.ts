import { BadRequestError, NotFoundError } from "@/core/errors/error/index.js";
import { CreateCompanyDTO } from "../company/company.dtos.js";
import { CompanyRepository } from "../company/company.repository.js";
import { PasswordManager } from "@/core/utils/hash.util.js";
import { CreateEmployeeDTO } from "../employee/employee.dtos.js";
import excludePassword from "@/core/utils/excludePassword.util.js";

export class CompanyService {
  private companyRepository = new CompanyRepository();

  async createCompany(createCompanyDTO: CreateCompanyDTO) {
    const existingCompany = await this.companyRepository.findByName(
      createCompanyDTO.name
    );
    if (existingCompany) {
      throw new BadRequestError("Company already exists");
    }
    const existingEmail = await this.companyRepository.findByEmail(
      createCompanyDTO.email
    );
    if (existingEmail) {
      throw new BadRequestError("Company Email already in use");
    }

    const hashedPassword = await PasswordManager.encrypt(
      createCompanyDTO.employee.password
    );
    createCompanyDTO.employee.password = hashedPassword;

    const company = await this.companyRepository.create(createCompanyDTO);

    const companyData = {
      ...company,
      employees: company.employees.map(excludePassword),
    };

    return companyData;
  }

  async getAllCompanies() {
    return this.companyRepository.getAll();
  }

  async getSingleCompany(id: string) {
    const existingCompany = await this.companyRepository.findById(id);
    if (!existingCompany) {
      throw new NotFoundError("Company not Found");
    }

    return existingCompany;
  }

  async updateCompany() {}

  async deleteCompany(id: string) {
    const existingCompany = await this.companyRepository.findById(id);
    if (!existingCompany) {
      throw new NotFoundError("Company not Found");
    }

    await this.companyRepository.delete(id);

    return "success";
  }
}
