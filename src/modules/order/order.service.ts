import { NotFoundError } from "@/core/errors/error/index.js";
import { CreateOrderDTO } from "./order.dtos.js";
import { OrderRepository } from "./order.repository.js";

export class OrderService {
  private orderRepository = new OrderRepository();

  async createOrder(createOrderDTO: CreateOrderDTO) {
    const order = await this.orderRepository.create(createOrderDTO);

    return order;
  }

  async getAllOrders() {
    const orders = await this.orderRepository.getAll();

    return orders;
  }

  async getAllOrdersForCompany(company_id: string) {
    const companyOrders = await this.orderRepository.getAllForCompany(
      company_id
    );

    return companyOrders;
  }

  async getSingleOrder(order_id: string) {
    const existingOrder = await this.orderRepository.findById(order_id);
    if (!existingOrder) {
      throw new NotFoundError("Order not found");
    }

    return existingOrder;
  }

  async updateOrder() {}

  async deleteOrder(order_id: string) {
    const existingOrder = await this.orderRepository.findById(order_id);
    if (!existingOrder) {
      throw new NotFoundError("Order not found");
    }

    await this.orderRepository.delete(order_id);

    return "success";
  }
}
