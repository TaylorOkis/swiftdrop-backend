import { TrackRepository } from "./track.repository.js";

export class TrackService {
  private trackRepository = new TrackRepository();

  async getOrdersForDriver(driverId: string) {
    const orders = await this.trackRepository.getDriverOrders(driverId);

    return orders;
  }

  async getReferenceForOrder(orderId: string) {
    const reference = await this.trackRepository.getOrderReference(orderId);

    return reference;
  }
}
