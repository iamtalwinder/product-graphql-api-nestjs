import { UserRole } from 'src/user';
export interface TokenPayload {
  id: string;
  email: string;
  role: UserRole;
}
