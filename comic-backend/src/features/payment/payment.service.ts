import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Access } from 'src/models/access.model';
import { Payment } from 'src/models/payment.model';
import { PaymentMethod } from 'src/models/paymentmethod.model';
import { User } from 'src/models/user.model';

@Injectable()
export class PaymentService {
  constructor(
    @InjectModel(User)
    private userModel: typeof User,
    @InjectModel(Access)
    private accessModel: typeof Access,
    @InjectModel(Payment)
    private paymentModel: typeof Payment,
    @InjectModel(PaymentMethod)
    private paymentMethodModel: typeof PaymentMethod,
  ) {}

  getPaymentMethods() {
    return this.paymentMethodModel.findAll();
  }
  
}
