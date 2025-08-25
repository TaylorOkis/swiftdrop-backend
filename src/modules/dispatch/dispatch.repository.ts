import db from "@/config/database.js";
import { AssignDriverDTO, UpdateOrderStatusDTO } from "./dispatch.dtos.js";

export class DispatchRepository {
  async assignDriver(assignDriver: AssignDriverDTO) {
    return await db.order.update({
      where: { order_id: assignDriver.order_id },
      data: { driver_id: assignDriver.driver_id },
    });
  }

  async updateOrderStatus(updateOrderStatus: UpdateOrderStatusDTO) {
    return await db.order.update({
      where: { order_id: updateOrderStatus.order_id },
      data: { status: updateOrderStatus.status },
    });
  }
}
