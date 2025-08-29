import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Cache } from 'cache-manager';
import { Op } from 'sequelize';
import { Banner } from 'src/models/banner.model';
import { Blog } from 'src/models/blog.model';

@Injectable()
export default class PublicService {
  constructor(
    @InjectModel(Blog)
    private blogModel: typeof Blog,
    @InjectModel(Banner)
    private bannerModel: typeof Banner,
    @Inject(CACHE_MANAGER) private readonly cacheManager: Cache,
  ) {}

  async findBlogs(
    skip: number = 0,
    limit: number = 10,
    sort: string | null = 'created_at::desc',
    tag: string | null,
  ) {
    const parsedSort = sort.split('::');
    const cacheKey = `blogs:${skip}:${limit}:${sort}:${tag || 'all'}`;

    return this.cacheManager.wrap(cacheKey, async () => {
      if (tag) {
        return await this.blogModel.findAll({
          where: {
            tags: {
              [Op.like]: `%${tag}%`,
            },
          },
          offset: parseInt(skip.toString()),
          limit: parseInt(limit.toString()),
          order: [[parsedSort[0], parsedSort[1]]],
        });
      }

      return await this.blogModel.findAll({
        offset: parseInt(skip.toString()),
        limit: parseInt(limit.toString()),
        order: [[parsedSort[0], parsedSort[1]]],
      });
    });
  }

  async findBlogById(blogId: number) {
    if (!blogId) {
      throw new Error('Blog id is required');
    }
    const cacheKey = `blog:${blogId}`;

    return this.cacheManager.wrap(cacheKey, async () => {
      return await this.blogModel.findByPk(blogId);
    });
  }

  async getActiveBannerByPosition(position: string) {
    const cacheKey = `banners:${position}`;

    return this.cacheManager.wrap(cacheKey, async () => {
      return await this.bannerModel.findAll({
        where: {
          position,
          status: 'active',
          [Op.or]: [
            {
              start_date: {
                [Op.lte]: new Date(),
              },
              end_date: {
                [Op.gte]: new Date(),
              },
            },
            {
              start_date: null,
              end_date: null,
            },
          ],
        },
      });
    });
  }
}
