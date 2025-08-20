import bcrypt from "bcryptjs";

export class PasswordManager {
  static async encrypt(password: string) {
    return await bcrypt.hash(password, 10);
  }
  async decrypt() {}
}
