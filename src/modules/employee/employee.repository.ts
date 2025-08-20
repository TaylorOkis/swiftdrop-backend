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

  async findByEmail(email: string) {
    return db.employee.findUnique({
      where: { email },
    });
  }

  async findById(id: string) {
    return db.employee.findUnique({
      where: { id },
    });
  }

  async delete(id: string) {
    return db.employee.delete({
      where: { id },
    });
  }
}
