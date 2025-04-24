import { Module } from '@nestjs/common';
import { PublicController } from './public.controller';
import PublicService from './public.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { Blog } from 'src/models/blog.model';
import { Banner } from 'src/models/banner.model';

@Module({
  imports: [SequelizeModule.forFeature([Blog, Banner])],
  controllers: [PublicController],
  providers: [PublicService],
})
export class PublicModule {}
