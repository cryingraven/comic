import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { SaveProfileDTO } from 'src/dto/saveprofile.dto';
import { User } from 'src/models/user.model';
import { FirebaseService } from 'src/modules/firebase/firebase.service';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User) private user: typeof User,
    private readonly firebaseService: FirebaseService,
  ) {}

  getUserProfile(firebaseUid: string) {
    return this.user.findOne({ where: { firebase_uid: firebaseUid } });
  }

  async saveProfile(firebaseUid: string, profile: SaveProfileDTO) {
    const user = await this.firebaseService.getUserByUid(firebaseUid);

    const existingProfile = await this.user.findOne({
      where: { firebase_uid: firebaseUid },
    });

    if (existingProfile) {
      if (profile.fullname) existingProfile.fullname = profile.fullname;
      if (profile.phone) existingProfile.phone_number = profile.phone;
      if (profile.image) existingProfile.image = profile.image;

      return await existingProfile.save();
    } else {
      const profileImage = profile.image || user.photoURL;

      return await this.user.create({
        firebase_uid: firebaseUid,
        email: user.email,
        phone_number: profile.phone,
        fullname: profile.fullname,
        image: profileImage,
      });
    }
  }
}
