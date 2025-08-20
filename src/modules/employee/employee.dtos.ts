export class CreateEmployeeDTO {
  username?: string;
  password!: string;
  firstname!: string;
  middlename?: string;
  lastname!: string;
  email!: string;
  role?: string;
  status?: string;
  phone!: string;
  image?: string;
  company_id?: string;
}
