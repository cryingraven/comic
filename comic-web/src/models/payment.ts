import { PaymentMethod } from "./paymentmethod";
import { User } from "./user";

export interface Payment {
  payment_id: number;
  user_id: number;
  user: User;
  payment_method_id: number;
  payment_method: PaymentMethod;
  type: string;
  amount: number;
  status: string;
  amount_to_add: number | null;
  payment_response: string;
  created_at: Date;
  updated_at: Date;
}