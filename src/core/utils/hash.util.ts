import bcrypt from "bcryptjs";

export class PasswordManager {
  static async encrypt(password: string) {
    return await bcrypt.hash(password, 10);
  }
  static async decrypt(userInput: string, password: string) {
    return await bcrypt.compare(password, userInput);
  }
}
