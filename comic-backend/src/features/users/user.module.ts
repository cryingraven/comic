import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from 'src/models/user.model';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { FirebaseModule } from 'src/modules/firebase/firebase.module';

@Module({
  imports: [SequelizeModule.forFeature([User]), FirebaseModule],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {
  constructor() {}
}
