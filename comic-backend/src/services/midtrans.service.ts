import { Injectable } from '@nestjs/common';
import {
  PaymentGatewayService,
  PaymentResponse,
  PaymentType,
} from './interface/paymentgateway';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { createHmac } from 'crypto';

@Injectable()
export class MidtransService implements PaymentGatewayService {
  private auth: string = 'Basic ';
  private chargeUrl: string = 'https://api.sandbox.midtrans.com/v2/charge';
  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {
    const midtransServerKey = this.configService.get<string>(
      'MIDTRANS_SERVER_KEY',
    );
    const midtransChargeUrl = this.configService.get<string>(
      'MIDTRANS_CHARGE_URL',
    );

    if (midtransChargeUrl) {
      this.chargeUrl = midtransChargeUrl;
    }
    this.auth += Buffer.from(midtransServerKey + ':').toString('base64');
  }
  async createPaymentRequest(
    paymentType: PaymentType,
    channel: string,
    amount: number,
    referenceId: string,
  ): Promise<PaymentResponse> {
    try {
      let payload: any = {
        transaction_details: {
          order_id: referenceId,
          gross_amount: amount,
        },
      };

      if (paymentType === 'va') {
        payload.payment_type = 'bank_transfer';
        payload.bank_transfer = {
          bank: channel,
        };
      } else if (paymentType === 'ewallet') {
        payload.payment_type = channel;
      }

      const response = await this.httpService.axiosRef.post(
        this.chargeUrl,
        payload,
        {
          headers: {
            Authorization: this.auth,
          },
        },
      );

      return response.data;
    } catch (error) {
      console.log(error.response.data);
      throw new Error(error.message);
    }
  }

  async validateSignature(
    signatureKey: string,
    orderId: string,
    statusCode: string,
    grossAmount: string,
  ) {
    const midtransServerKey = this.configService.get<string>(
      'MIDTRANS_SERVER_KEY',
    );
    const data = orderId + statusCode + grossAmount + midtransServerKey;
    const expectedSignatureKey = createHmac('sha512', midtransServerKey)
      .update(data)
      .digest('hex');
    return signatureKey === expectedSignatureKey;
  }
}
