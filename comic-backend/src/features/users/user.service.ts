import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from 'src/models/user.model';

@Injectable()
export class UserService {
  constructor(@InjectModel(User) private user: typeof User) {}

  getUserProfile(firebaseUid: string) {
    return this.user.findOne({ where: { firebase_user_id: firebaseUid } });
  }
}
