import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Access } from 'src/models/access.model';
import { User } from 'src/models/user.model';
import { PaymentController } from './payment.controller';
import { PaymentService } from './payment.service';
import { Payment } from 'src/models/payment.model';
import { PaymentMethod } from 'src/models/paymentmethod.model';
import { Comic } from 'src/models/comic.model';
import { Chapter } from 'src/models/chapter.model';
import { FirebaseModule } from 'src/modules/firebase/firebase.module';
import { HttpModule } from '@nestjs/axios';
import { MidtransService } from 'src/services/midtrans.service';
import { Package } from 'src/models/package.model';
@Module({
  imports: [
    SequelizeModule.forFeature([
      User,
      Access,
      Comic,
      Chapter,
      Payment,
      PaymentMethod,
      Package,
    ]),
    FirebaseModule,
    HttpModule,
  ],
  controllers: [PaymentController],
  providers: [PaymentService, MidtransService],
  exports: [PaymentService, MidtransService],
})
export class PaymentModule {
  constructor() {}
}
