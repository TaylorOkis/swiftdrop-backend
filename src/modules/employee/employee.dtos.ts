export class CreateEmployeeDTO {
  username?: string;
  password!: string;
  firstname!: string;
  middlename?: string;
  lastname!: string;
  email!: string;
  role!: "ADMIN" | "DRIVER" | "DISPATCHER";
  status?: "ACTIVE" | "INACTIVE";
  phone!: string;
  image?: string;
  company_id!: string;
}
