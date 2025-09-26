import { TrackRepository } from "./track.repository.js";

export class TrackService {
  private trackRepository = new TrackRepository();

  async getOrdersForDriver(driverId: string) {
    const orders = await this.trackRepository.getDriverOrders(driverId);

    return orders;
  }
}
