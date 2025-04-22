import { Controller, Get, Param, Query } from '@nestjs/common';
import PublicService from './public.service';
import { ArrayResponseDto } from 'src/dto/arrayresponse.dto';
import { BasicResponseDto } from 'src/dto/basicresponse.dto';

@Controller('public')
export class PublicController {
  constructor(private readonly publicService: PublicService) {}

  @Get('/blogs')
  async getBlogs(
    @Query('skip') skip: number,
    @Query('limit') limit: number,
    @Query('order_by') sort: string,
    @Query('tag') tag: string,
  ) {
    const blogs = await this.publicService.findBlogs(skip, limit, sort, tag);

    return ArrayResponseDto.success('fetch blog success', blogs);
  }

  @Get('/blogs/:id')
  async getBlogById(@Param('id') id: number) {
    const blog = await this.publicService.findBlogById(id);
    return BasicResponseDto.success('fetch blog success', blog);
  }
}
