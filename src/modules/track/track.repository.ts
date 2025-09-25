import db from "@/config/database.js";

export class TrackRepository {
  async getDriverOrders(driver_id: string) {
    return await db.order.findMany({
      where: { driver_id },
      orderBy: { updatedAt: "desc" },
    });
  }

  async getOrderReference(order_id: string) {
    return await db.order.findUnique({
      where: { id: order_id },
      select: { reference_id: true },
    });
  }
}
