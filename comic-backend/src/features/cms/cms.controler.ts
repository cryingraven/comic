import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
  Req,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import CMSService from './cms.service';
import { FirebaseGuard } from 'src/modules/firebase/firebase.guard';
import { UserRequest } from 'src/types/user.type';
import { ArrayResponseDto } from 'src/dto/arrayresponse.dto';
import { BasicResponseDto } from 'src/dto/basicresponse.dto';
import { EditComicDTO, SaveChapterDTO, SaveComicDTO } from 'src/dto/cms.dto';
import moment from 'moment';
import { CacheInterceptor, CacheTTL } from '@nestjs/cache-manager';

@Controller('cms')
export class CMSController {
  constructor(private readonly cmsService: CMSService) {}

  @CacheTTL(1)
  @Get('comics')
  @UseGuards(FirebaseGuard)
  @UseInterceptors(CacheInterceptor)
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

  @CacheTTL(1) // 1 day
  @Get('comics/:comicId/chapters')
  @UseGuards(FirebaseGuard)
  @UseInterceptors(CacheInterceptor)
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

  @CacheTTL(60 * 60 * 24) // 1 day
  @Get('genres')
  @UseGuards(FirebaseGuard)
  @UseInterceptors(CacheInterceptor)
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

  @Get('chapters/:chapterId/pages')
  @UseGuards(FirebaseGuard)
  async getChapterPages(@Param('chapterId') chapterId: number) {
    const data = await this.cmsService.getChapterPages(chapterId);
    return BasicResponseDto.success('success', data);
  }

  @Delete('comics/:comicId')
  @UseGuards(FirebaseGuard)
  async unpublishedComic(
    @Req() userRequest: UserRequest,
    @Param('comicId') comicId: number,
  ) {
    const userId = userRequest.user.uid || '';
    const data = await this.cmsService.unPublishComic(comicId, userId);
    return BasicResponseDto.success('success', data);
  }

  @CacheTTL(60)
  @Get('author/wallet/txs')
  @UseGuards(FirebaseGuard)
  @UseInterceptors(CacheInterceptor)
  async getAuthorWalletBalanceTransaction(
    @Req() userRequest: UserRequest,
    @Query('start_date') startDate: string,
    @Query('end_date') endDate: string,
    @Query('skip') skip: string,
    @Query('limit') limit: string,
  ) {
    const userId = userRequest.user.uid || '';
    const startDateInternal =
      startDate && startDate !== ''
        ? new Date(startDate)
        : moment().add(-7, 'days').toDate();
    const endDateInternal =
      endDate && endDate !== '' ? new Date(endDate) : moment().toDate();
    const skipInternal = parseInt(skip) || 0;
    const limitInternal = parseInt(limit) || 10;
    const data = await this.cmsService.getAuthorWalletBalanceTransaction(
      userId,
      startDateInternal,
      endDateInternal,
      skipInternal,
      limitInternal,
    );
    return ArrayResponseDto.success('success', data);
  }

  @CacheTTL(60)
  @Get('author/banks')
  @UseGuards(FirebaseGuard)
  @UseInterceptors(CacheInterceptor)
  async getAllBanks() {
    const data = await this.cmsService.getAllBanks();
    return ArrayResponseDto.success('success', data);
  }

  @CacheTTL(60)
  @Get('author/stats')
  @UseGuards(FirebaseGuard)
  @UseInterceptors(CacheInterceptor)
  async getAuthorWalletBalance(@Req() userRequest: UserRequest) {
    const userId = userRequest.user.uid || '';
    const data =
      await this.cmsService.getDashboardStatsCountByFirebaseUid(userId);
    return BasicResponseDto.success('success', data);
  }

  @UseGuards(FirebaseGuard)
  @Post('comics/publish/:comicId')
  async publishComic(
    @Req() userRequest: UserRequest,
    @Param('comicId') comicId: number,
  ) {
    const userId = userRequest.user.uid || '';
    const data = await this.cmsService.publishComic(comicId, userId);
    return BasicResponseDto.success('success', data);
  }

  @UseGuards(FirebaseGuard)
  @Post('comics/delete-all/:comicId')
  async deleteAllComic(
    @Req() userRequest: UserRequest,
    @Param('comicId') comicId: number,
  ) {
    const userId = userRequest.user.uid || '';
    const data = await this.cmsService.deleteComicAndAllData(comicId, userId);
    return BasicResponseDto.success('success', data);
  }
}
