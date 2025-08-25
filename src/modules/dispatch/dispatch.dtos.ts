export class AssignDriverDTO {
  order_id!: string;
  driver_id!: string;
}

export class UpdateOrderStatusDTO {
  order_id!: string;
  status!: "PENDING" | "ASSIGNED" | "IN_TRANSIT" | "DELIVERED" | "CANCELLED";
}
