import * as bcrypt from 'bcrypt';

export class EncryptionService {
  public static async hash(plain: string, salt: number = 10): Promise<string> {
    return bcrypt.hash(plain, salt);
  }

  public static async compare(plain: string, hashed: string): Promise<boolean> {
    return bcrypt.compare(plain, hashed);
  }
}
