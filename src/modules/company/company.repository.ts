import db from "@/config/database.js";
import { CreateCompanyDTO } from "./company.dtos.js";

export class CompanyRepository {
  async create(createCompanyDTO: CreateCompanyDTO) {
    return await db.company.create({
      data: {
        name: createCompanyDTO.name,
        email: createCompanyDTO.email,
        address: createCompanyDTO.address,
        color: createCompanyDTO.color,
        logo: createCompanyDTO.logo,
        employees: {
          create: [
            {
              username: createCompanyDTO.employee.username,
              password: createCompanyDTO.employee.password,
              firstname: createCompanyDTO.employee.firstname,
              middlename: createCompanyDTO.employee.middlename,
              lastname: createCompanyDTO.employee.lastname,
              email: createCompanyDTO.employee.email,
              role: createCompanyDTO.employee.role,
              status: createCompanyDTO.employee.status,
              phone: createCompanyDTO.employee.phone,
              image: createCompanyDTO.employee.image,
            },
          ],
        },
      },
      include: { employees: true },
    });
  }

  async getAll() {
    return await db.company.findMany({
      orderBy: { updatedAt: "desc" },
    });
  }

  async findByEmail(email: string) {
    return await db.company.findUnique({
      where: { email },
    });
  }

  async findById(id: string) {
    return await db.company.findUnique({
      where: { id },
    });
  }

  async findByName(name: string) {
    return await db.company.findUnique({
      where: { name },
    });
  }

  async delete(id: string) {
    return await db.company.delete({
      where: { id },
    });
  }
}
