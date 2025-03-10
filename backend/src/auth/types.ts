import { Request } from 'express';

export interface AuthenticatedRequest extends Request {
  user?: any; // This tells TypeScript that 'user' can exist on the Request object
}
