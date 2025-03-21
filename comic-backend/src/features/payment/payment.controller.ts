import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { PaymentService } from './payment.service';
import { ArrayResponseDto } from 'src/dto/arrayresponse.dto';
import { BasicResponseDto } from 'src/dto/basicresponse.dto';
import { FirebaseGuard } from 'src/modules/firebase/firebase.guard';
import { UserRequest } from 'src/types/user.type';
import { TopupDTO } from 'src/dto/topup.dto';

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

  @Post('topup')
  @UseGuards(FirebaseGuard)
  async topup(@Req() req: UserRequest, @Body() body: TopupDTO) {
    const firebaseUid = req.user.uid;
    const result = await this.paymentService.topUpPackage(
      firebaseUid,
      body.package_id,
      body.method_id,
    );

    return BasicResponseDto.success('Topup successfully', result);
  }

  @Get('packages')
  async getAllPackages() {
    const packages = await this.paymentService.getAllPackages();
    return ArrayResponseDto.success(
      'Packages retrieved successfully',
      packages,
    );
  }

  @Get('/detail/:paymentId')
  @UseGuards(FirebaseGuard)
  async getPaymentById(@Param('paymentId') paymentId: number) {
    const payment = await this.paymentService.getPaymentById(paymentId);
    return BasicResponseDto.success('Payment retrieved successfully', payment);
  }

  @Post('handle_webhooks')
  async handleWebHooks(@Body() body: any, @Req() req: any) {
    console.log('Notification received:', body);
    console.log('Headers:', req.headers);
    await this.paymentService.handleMidtransNotification(body);
    return BasicResponseDto.success('Notification handled successfully', null);
  }
}
