import { Controller, Get, Param, Post, Req, UseGuards } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { ArrayResponseDto } from 'src/dto/arrayresponse.dto';
import { BasicResponseDto } from 'src/dto/basicresponse.dto';
import { FirebaseGuard } from 'src/modules/firebase/firebase.guard';
import { UserRequest } from 'src/types/user.type';

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

  @Post('buy/:comicId/:chapterId')
  @UseGuards(FirebaseGuard)
  async buyChapterUsingCoin(
    @Param('comicId') comicId: number,
    @Param('chapterId') chapterId: number,
    @Req() req: UserRequest,
  ) {
    const userId = req.user.uid;

    const result = await this.paymentService.buyChapterUsingCoin(
      userId,
      comicId,
      chapterId,
    );
    return BasicResponseDto.success('Chapter purchased successfully', result);
  }
}
