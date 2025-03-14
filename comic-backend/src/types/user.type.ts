import { Request } from 'express';

export interface UserRequest extends Request {
  user?: {
    uid: string;
    email?: string;
    phone_number?: string;
  };
}
