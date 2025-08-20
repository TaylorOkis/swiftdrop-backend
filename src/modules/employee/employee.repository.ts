import db from "@/config/database.js";
import { CreateEmployeeDTO } from "./employee.dtos.js";

export class EmployeeRepository {
  async create(createEmployeeDTO: CreateEmployeeDTO) {
    return db.employee.create({
      data: { createEmployeeDTO },
    });
  }

  async getAll() {
    return db.employee.findMany({
      orderBy: { updatedAt: "desc" },
    });
  }

  async getAllForCompany(company_id: string) {
    return db.employee.findMany({
      where: { company_id },
      orderBy: { updatedAt: "desc" },
    });
  }

  async findById(id: string) {
    return db.employee.findUnique({
      where: { id },
      include: { company: true },
    });
  }

  async findEmailOrPhoneNumber(
    company_id: string,
    phone: string,
    email: string
  ) {
    return db.employee.findFirst({
      where: {
        AND: [
          { company_id: company_id },
          { OR: [{ phone: phone, email: email }] },
        ],
      },
    });
  }

  async delete(id: string) {
    return db.employee.delete({
      where: { id },
    });
  }
}
