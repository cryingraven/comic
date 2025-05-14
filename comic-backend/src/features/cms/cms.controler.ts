import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import CMSService from './cms.service';
import { FirebaseGuard } from 'src/modules/firebase/firebase.guard';
import { UserRequest } from 'src/types/user.type';
import { ArrayResponseDto } from 'src/dto/arrayresponse.dto';
import { BasicResponseDto } from 'src/dto/basicresponse.dto';
import { EditComicDTO, SaveChapterDTO, SaveComicDTO } from 'src/dto/cms.dto';

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

  @Post('comics')
  @UseGuards(FirebaseGuard)
  async saveComic(
    @Req() userRequest: UserRequest,
    @Body() comic: SaveComicDTO,
  ) {
    const userId = userRequest.user.uid || '';
    const data = await this.cmsService.createComic(comic, userId);
    return BasicResponseDto.success('success', data);
  }

  @Post('/chapters')
  @UseGuards(FirebaseGuard)
  async saveChapter(
    @Req() userRequest: UserRequest,
    @Param('comicId') comicId: number,
    @Body() chapter: any,
  ) {
    const userId = userRequest.user.uid || '';
    const data = await this.cmsService.createChapter(chapter, userId);
    return BasicResponseDto.success('success', data);
  }

  @Get('comics/:comicId')
  @UseGuards(FirebaseGuard)
  async getComicById(@Param('comicId') comicId: number) {
    const data = await this.cmsService.getComicById(comicId);
    return BasicResponseDto.success('success', data);
  }

  @Get('chapters/:chapterId')
  @UseGuards(FirebaseGuard)
  async getChapterById(@Param('chapterId') chapterId: number) {
    const data = await this.cmsService.getChapterById(chapterId);
    return BasicResponseDto.success('success', data);
  }

  @Post('comics/:comicId')
  @UseGuards(FirebaseGuard)
  async updateComic(
    @Req() userRequest: UserRequest,
    @Param('comicId') comicId: number,
    @Body() comic: EditComicDTO,
  ) {
    const userId = userRequest.user.uid || '';
    const data = await this.cmsService.updateComic(comic, comicId, userId);
    return BasicResponseDto.success('success', data);
  }

  @Post('chapters/:chapterId')
  @UseGuards(FirebaseGuard)
  async updateChapter(
    @Req() userRequest: UserRequest,
    @Param('chapterId') chapterId: number,
    @Body() chapter: SaveChapterDTO,
  ) {
    const userId = userRequest.user.uid || '';
    const data = await this.cmsService.updateChapter(
      chapter,
      chapterId,
      userId,
    );
    return BasicResponseDto.success('success', data);
  }
}
