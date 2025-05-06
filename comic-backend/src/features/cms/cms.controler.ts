import { Controller, Get, Param, Query, Req, UseGuards } from '@nestjs/common';
import CMSService from './cms.service';
import { FirebaseGuard } from 'src/modules/firebase/firebase.guard';
import { UserRequest } from 'src/types/user.type';
import { ArrayResponseDto } from 'src/dto/arrayresponse.dto';
import { BasicResponseDto } from 'src/dto/basicresponse.dto';

@Controller('cms')
export class CMSController {
  constructor(private readonly cmsService: CMSService) {}

  @Get('comics')
  @UseGuards(FirebaseGuard)
  async getComicsByAuthorFirebaseId(
    @Req() userRequest: UserRequest,
    @Query('skip') skip: number,
    @Query('limit') limit: number,
  ) {
    const authorFirebaseId = userRequest.user.uid || '';
    const data = await this.cmsService.getComicsByAuthorFirebaseId(
      authorFirebaseId,
      skip,
      limit,
    );

    return ArrayResponseDto.success('success', data);
  }

  @Get('comics/:comicId/chapters')
  @UseGuards(FirebaseGuard)
  async getChaptersByComicId(
    @Req() userRequest: UserRequest,
    @Param('comicId') comicId: number,
    @Query('skip') skip: number,
    @Query('limit') limit: number,
  ) {
    const data = await this.cmsService.getChaptersByComicId(
      comicId,
      skip,
      limit,
    );

    return BasicResponseDto.success('success', data);
  }

  @Get('genres')
  @UseGuards(FirebaseGuard)
  async getAllGenresForInput() {
    const data = await this.cmsService.getAllGenresForInput();
    return ArrayResponseDto.success('success', data);
  }
}
