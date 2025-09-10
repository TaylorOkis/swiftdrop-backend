import db from "@/config/database.js";

import { CreateOrderDTO } from "./order.dtos.js";

export class OrderRepository {
  async create(createOrderDTO: CreateOrderDTO) {
    return await db.order.create({ data: createOrderDTO });
  }

  async getAll() {
    return await db.order.findMany({
      orderBy: { updatedAt: "desc" },
    });
  }

  async getAllForCompany(company_id: string) {
    return await db.order.findMany({
      where: { company_id },
      orderBy: { updatedAt: "desc" },
    });
  }

  async findById(id: string) {
    return await db.order.findUnique({
      where: { id },
      include: { dispatcher: true, driver: true },
    });
  }

  async delete(id: string) {
    return await db.employee.delete({
      where: { id },
    });
  }
}
