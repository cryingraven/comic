import { Controller, Get } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { ArrayResponseDto } from 'src/dto/arrayresponse.dto';

@Controller('payment')
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  @Get('methods')
  async getPaymentMethods() {
    const methods = await this.paymentService.getPaymentMethods();

    return ArrayResponseDto.success(
      'Payment methods retrieved successfully',
      methods,
    );
  }
}
