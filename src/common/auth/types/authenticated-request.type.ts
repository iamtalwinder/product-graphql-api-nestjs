import { TokenPayload } from '../interfaces/token-payload.interface';

export type AuthenticatedRequest = Request & { user: TokenPayload };