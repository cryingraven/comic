import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Cache } from 'cache-manager';
import { SaveProfileDTO } from 'src/dto/saveprofile.dto';
import { User } from 'src/models/user.model';
import { FirebaseService } from 'src/modules/firebase/firebase.service';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User) private user: typeof User,
    @Inject(CACHE_MANAGER) private readonly cacheManager: Cache,
    private readonly firebaseService: FirebaseService,
  ) {}

  async getUserProfile(firebaseUid: string) {
    const cacheKey = `user_profile_${firebaseUid}`;
    const cachedProfile = await this.cacheManager.get(cacheKey);

    if (cachedProfile) {
      return cachedProfile;
    }

    const profile = await this.user.findOne({
      where: { firebase_uid: firebaseUid },
    });

    if (profile) {
      await this.cacheManager.set(cacheKey, profile, 3600); // Cache for 1 hour
    }

    return profile;
  }

  async saveProfile(firebaseUid: string, profile: SaveProfileDTO) {
    const user = await this.firebaseService.getUserByUid(firebaseUid);

    const existingProfile = await this.user.findOne({
      where: {
        email: user.email,
      },
    });

    if (existingProfile) {
      existingProfile.firebase_uid = firebaseUid;
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
