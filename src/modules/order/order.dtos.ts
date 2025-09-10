export class CreateOrderDTO {
  sender_name!: string;
  sender_address!: string;
  sender_phone_number!: string;
  receiver_name!: string;
  receiver_address!: string;
  receiver_phone_number!: string;
  delivery_class!: string;
  item_class!: string;
  driver_note?: string;
  status!: "PENDING" | "ASSIGNED" | "IN_TRANSIT" | "DELIVERED" | "CANCELLED";
  driver_id?: string;
  created_by!: string;
  company_id!: string;
}
