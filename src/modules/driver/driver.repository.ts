import db from "@/config/database.js";
import { DriverDTO, UpdateTripStatusDTO } from "./driver.dtos.js";

export class DriverRepository {
  async create(createDriverProfile: DriverDTO) {
    return await db.driver.create({ data: createDriverProfile });
  }

  async getAll() {
    return await db.driver.findMany({ orderBy: { updatedAt: "desc" } });
  }

  async getAllForCompany(company_id: string) {
    return await db.driver.findMany({ where: { employee: { company_id } } });
  }

  async findById(driver_id: string) {
    return await db.driver.findUnique({ where: { id: driver_id } });
  }

  async update(driverDTO: DriverDTO) {
    return await db.driver.update({
      where: { id: driverDTO.driver_id },
      data: driverDTO,
    });
  }

  async updateStatus(tripStatusDTO: UpdateTripStatusDTO) {
    return await db.driver.update({
      where: { id: tripStatusDTO.driver_id },
      data: { trip_status: tripStatusDTO.trip_status },
      select: { id: true, trip_status: true },
    });
  }
}
