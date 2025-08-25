export class DriverDTO {
  driver_id!: string;
  employee_id!: string;
  plate_number!: string;
  guarantor_name!: string;
  guarantor_phone_number!: string;
  guarantor_address!: string;
  trip_status?: "AVAILABLE" | "ON_TRIP" | "OFFLINE";
}

export class UpdateTripStatusDTO {
  driver_id!: string;
  trip_status!: "AVAILABLE" | "ON_TRIP" | "OFFLINE";
}
