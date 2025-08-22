import db from "@/config/database.js";
import { CreateEmployeeDTO } from "./employee.dtos.js";

export class EmployeeRepository {
  async create(createEmployeeDTO: CreateEmployeeDTO) {
    return await db.employee.create({
      data: createEmployeeDTO,
    });
  }

  async getAll() {
    return await db.employee.findMany({
      orderBy: { updatedAt: "desc" },
    });
  }

  async getAllForCompany(company_id: string) {
    return await db.employee.findMany({
      where: { company_id },
      orderBy: { updatedAt: "desc" },
    });
  }

  async findById(id: string) {
    return await db.employee.findUnique({
      where: { id },
      include: { company: true },
    });
  }

  async findEmailOrPhoneNumber(
    company_id: string,
    phone: string,
    email: string
  ) {
    return await db.employee.findFirst({
      where: {
        AND: [
          { company_id: company_id },
          { OR: [{ phone: phone, email: email }] },
        ],
      },
    });
  }

  async delete(id: string) {
    return await db.employee.delete({
      where: { id },
    });
  }
}
