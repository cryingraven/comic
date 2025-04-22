import { Controller, Get, Query, Req, UseGuards } from '@nestjs/common';
import CMSService from './cms.service';
import { FirebaseGuard } from 'src/modules/firebase/firebase.guard';
import { UserRequest } from 'src/types/user.type';
import { ArrayResponseDto } from 'src/dto/arrayresponse.dto';

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
}
