import { Module } from '@nestjs/common';
import { CMSController } from './cms.controler';
import { Comic } from 'src/models/comic.model';
import { SequelizeModule } from '@nestjs/sequelize';
import CMSService from './cms.service';
import { FirebaseModule } from 'src/modules/firebase/firebase.module';

@Module({
  imports: [SequelizeModule.forFeature([Comic]), FirebaseModule],
  controllers: [CMSController],
  providers: [CMSService],
})
export class CMSModule {}
