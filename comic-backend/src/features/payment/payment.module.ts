import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Access } from 'src/models/access.model';
import { User } from 'src/models/user.model';
import { PaymentController } from './payment.controller';
import { PaymentService } from './payment.service';
import { Payment } from 'src/models/payment.model';
import { PaymentMethod } from 'src/models/paymentmethod.model';
@Module({
  imports: [SequelizeModule.forFeature([User, Access, Payment, PaymentMethod])],
  controllers: [PaymentController],
  providers: [PaymentService],
  exports: [PaymentService],
})
export class PaymentModule {
  constructor() {}
}
