import { AssignDriverDTO, UpdateOrderStatusDTO } from "./dispatch.dtos.js";
import { DispatchRepository } from "./dispatch.repository.js";

export class DispatchService {
  private dispatchRepository = new DispatchRepository();
  async assignDriverToOrder(assignDriver: AssignDriverDTO) {
    const updatedOrder = this.dispatchRepository.assignDriver(assignDriver);
    return updatedOrder;
  }
  async updateOrderStatus(updateOrderStatusDTO: UpdateOrderStatusDTO) {
    const updatedOrder =
      this.dispatchRepository.updateOrderStatus(updateOrderStatusDTO);
    return updatedOrder;
  }
}
