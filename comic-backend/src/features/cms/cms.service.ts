import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Comic } from 'src/models/comic.model';
import { User } from 'src/models/user.model';

@Injectable()
export default class CMSService {
  constructor(
    @InjectModel(Comic)
    private comicModel: typeof Comic,
  ) {}

  async getComicsByAuthorFirebaseId(
    authorFirebaseId: string,
    skip: number,
    limit: number,
  ) {
    return await this.comicModel.findAll({
      include: [
        {
          model: User,
          where: { firebase_uid: authorFirebaseId },
        },
      ],
      offset: parseInt(skip.toString()),
      limit: parseInt(limit.toString()),
    });
  }
}
