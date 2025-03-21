export interface CarPayment {}

export interface EWalletPayment {}

export type PaymentType = 'va' | 'ewallet' | string;
export type PaymentResponse = CarPayment | EWalletPayment;

export interface PaymentGatewayService {
  createPaymentRequest(
    paymentType: PaymentType,
    channel: string,
    amount: number,
    referenceId: string,
  ): Promise<PaymentResponse>;
}
