export interface PaymentMethod {
  id: number;
  method_name: string;
  method_type: string;
  method_description: string;
  method_image: string;
  created_at: Date;
  updated_at: Date;
}