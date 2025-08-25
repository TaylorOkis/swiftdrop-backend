import { DriverDTO, UpdateTripStatusDTO } from "./driver.dtos.js";
import { DriverRepository } from "./driver.repository.js";
import { BadRequestError } from "@/core/errors/error/index.js";

export class DriverService {
  private driverRepository = new DriverRepository();
  async createDriverProfile(driverDTO: DriverDTO) {
    const existingDriver = await this.driverRepository.findById(
      driverDTO.driver_id
    );
    if (existingDriver) {
      throw new BadRequestError("Driver Profile already exists");
    }

    const driverProfile = await this.driverRepository.create(driverDTO);

    return driverProfile;
  }

  async getAllDrivers() {
    const driversProfiles = await this.driverRepository.getAll();

    return driversProfiles;
  }

  async getAllDriversForCompany(company_id: string) {
    const driversProfiles = await this.driverRepository.getAllForCompany(
      company_id
    );

    return driversProfiles;
  }

  async getSingleDriver(driver_id: string) {
    return await this.driverRepository.findById(driver_id);
  }

  async updateDriver(driverDTO: DriverDTO) {
    const existingDriver = await this.driverRepository.findById(
      driverDTO.driver_id
    );
    if (!existingDriver) {
      throw new BadRequestError("Driver Profile does not exists");
    }

    const driverProfile = await this.driverRepository.update(driverDTO);

    return driverProfile;
  }

  async updateDriverStatus(trip_status: UpdateTripStatusDTO) {
    const existingDriver = await this.driverRepository.findById(
      trip_status.driver_id
    );
    if (!existingDriver) {
      throw new BadRequestError("Driver Profile does not exists");
    }

    const driverProfile = await this.driverRepository.updateStatus(trip_status);

    return driverProfile;
  }
}
