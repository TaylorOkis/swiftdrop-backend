import {
  UnAuthenticatedError,
  UnAuthorizedError,
} from "@/core/errors/error/index.js";
import { LoginDTO } from "./auth.dtos.js";
import { AuthRepository } from "./auth.repository.js";
import { PasswordManager } from "@/core/utils/hash.util.js";

export class AuthService {
  private authRepository = new AuthRepository();
  private _errorMessage = "Wrong email or Password";

  async getEmployeeData(loginDTO: LoginDTO) {
    const existingEmployee = await this.authRepository.findByEmailOrUsername(
      loginDTO
    );

    if (!existingEmployee) {
      throw new UnAuthorizedError(this._errorMessage);
    }

    const passwordMatch = PasswordManager.decrypt(
      loginDTO.password,
      existingEmployee.password
    );
    if (!passwordMatch) {
      throw new UnAuthenticatedError(this._errorMessage);
    }

    const userToken = {
      id: existingEmployee.id,
      role: existingEmployee.role,
      company_id: existingEmployee.company_id,
    };

    return userToken;
  }
}
