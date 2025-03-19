import {
  Controller,
  Get,
  Param,
  Query,
  Req,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ReaderService } from './reader.service';
import { ArrayResponseDto } from 'src/dto/arrayresponse.dto';
import { BasicResponseDto } from 'src/dto/basicresponse.dto';
import { FirebaseGuard } from 'src/modules/firebase/firebase.guard';
import { UserRequest } from 'src/types/user.type';
import { CacheInterceptor } from '@nestjs/cache-manager';

@Controller('r')
export class ReaderController {
  constructor(private readonly readerService: ReaderService) {}

  @Get('comics')
  @UseInterceptors(CacheInterceptor)
  async comics(
    @Query('author_id') authorId: string,
    @Query('genre') genre: string,
    @Query('skip') skip: number,
    @Query('limit') limit: number,
    @Query('order_by') sort: string,
  ): Promise<ArrayResponseDto> {
    const data = await this.readerService.findComics(
      genre,
      authorId,
      skip,
      limit,
      sort,
    );
    return ArrayResponseDto.success('Comics fetched successfully', data);
  }

  @Get('comics/:id')
  @UseInterceptors(CacheInterceptor)
  async comic(@Param('id') id: number): Promise<BasicResponseDto> {
    const data = await this.readerService.getComicById(id);
    return BasicResponseDto.success('Comic fetched successfully', data);
  }

  @Get('comics/:id/chapters')
  @UseInterceptors(CacheInterceptor)
  async chapters(
    @Param('id') id: number,
    @Query('skip') skip: number,
    @Query('limit') limit: number,
    @Query('order_by') sort: string,
  ): Promise<ArrayResponseDto> {
    const data = await this.readerService.findChapters(id, skip, limit, sort);
    return ArrayResponseDto.success('Chapters fetched successfully', data);
  }

  @Get('chapters/:chapterId')
  @UseInterceptors(CacheInterceptor)
  async chapter(
    @Param('chapterId') chapterId: number,
  ): Promise<BasicResponseDto> {
    const data = await this.readerService.getChapterById(chapterId);
    return BasicResponseDto.success('Chapter fetched successfully', data);
  }

  @Get('pages/:chapterId')
  @UseInterceptors(CacheInterceptor)
  async read(@Param('chapterId') chapterId: number): Promise<ArrayResponseDto> {
    const data = await this.readerService.getChapterById(chapterId);

    if (data.price > 0) {
      return ArrayResponseDto.error(
        'You need to purchase this chapter to read it',
        [],
      );
    }

    const pages = await this.readerService.getPages(chapterId);

    return ArrayResponseDto.success('Pages fetched successfully', pages);
  }

  @Get('/paid-pages/:chapterId')
  @UseGuards(FirebaseGuard)
  async paidRead(
    @Param('chapterId') chapterId: number,
    @Req() req: UserRequest,
  ): Promise<ArrayResponseDto> {
    const firebaseUid = req.user.uid;
    const data = await this.readerService.getChapterById(chapterId);
    if (data.price == 0) {
      return ArrayResponseDto.error('You can read this chapter for free', []);
    }
    const comicId = data.comic_id;
    const access = await this.readerService.getAccess(
      firebaseUid,
      comicId,
      data.chapter_id,
    );

    if (!access) {
      return ArrayResponseDto.error(
        'You need to purchase this chapter to read it',
        [],
      );
    }

    const pages = await this.readerService.getPages(chapterId);

    return ArrayResponseDto.success('Pages fetched successfully', pages);
  }

  @Get('main-genres')
  @UseInterceptors(CacheInterceptor)
  async genres(): Promise<ArrayResponseDto> {
    const data = await this.readerService.findMainGenres();
    return ArrayResponseDto.success('Genres fetched successfully', data);
  }

  @Get('genres')
  @UseInterceptors(CacheInterceptor)
  async allGenres(): Promise<ArrayResponseDto> {
    const data = await this.readerService.findAllGenres();
    return ArrayResponseDto.success('Genres fetched successfully', data);
  }

  @Get('navigation/:comicId/:chapterId')
  @UseInterceptors(CacheInterceptor)
  async navigation(
    @Param('comicId') comicId: number,
    @Param('chapterId') chapterId: number,
  ): Promise<BasicResponseDto> {
    const previousChapter = await this.readerService.getPreviousChapter(
      comicId,
      chapterId,
    );

    const nextChapter = await this.readerService.getNextChapter(
      comicId,
      chapterId,
    );

    return BasicResponseDto.success('Navigation fetched successfully', {
      previous: previousChapter,
      next: nextChapter,
    });
  }
}
