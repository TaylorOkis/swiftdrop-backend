import db from "@/config/database.js";
import { LoginDTO } from "./auth.dtos.js";

export class AuthRepository {
  async findByEmailOrUsername(loginDTO: LoginDTO) {
    return await db.employee.findFirst({
      where: {
        OR: [{ username: loginDTO.username }, { email: loginDTO.email }],
      },
      select: {
        id: true,
        username: true,
        password: true,
        role: true,
        status: true,
        email: true,
        company_id: true,
      },
    });
  }
}
