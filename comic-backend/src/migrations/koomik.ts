import { QueryTypes, Sequelize } from 'sequelize';
import { Chapter } from 'src/models/chapter.model';
import { Comic } from 'src/models/comic.model';
import { Page } from 'src/models/page.model';
import { User } from 'src/models/user.model';

export async function koomik(sequelize: Sequelize, oldSequelize: Sequelize) {
  const queryInterface = sequelize.getQueryInterface();
  const oldQueryInterface = oldSequelize.getQueryInterface();

  const oldComics = (await oldQueryInterface.sequelize.query(
    'SELECT comic_type.`name` AS comic_type, comic.*, genre.`name` AS genre FROM comic' +
      ' INNER JOIN comic_type ON comic.comic_type_id = comic_type.id INNER JOIN genre ON comic.main_genre_id = genre.id',
    { type: QueryTypes.SELECT },
  )) as any[];

  const genres = (await oldQueryInterface.sequelize.query(
    'SELECT * FROM genre',
    { type: QueryTypes.SELECT },
  )) as any[];

  for (const oldComic of oldComics) {
    const comicId = oldComic.id;
    const userId = oldComic.user_id;

    if (!userId) {
      continue;
    }

    console.log(`Migrating comic ${comicId} from user ${userId}`);

    const users = await oldQueryInterface.sequelize.query(
      `SELECT * FROM _user WHERE id = '${userId}'`,
      { type: QueryTypes.SELECT },
    );
    if (users.length > 0) {
      const author = users[0] as any;

      console.log(`Migrating author ${author.email}`);

      const checkExistingAuthor = (await queryInterface.select(User, 'users', {
        where: {
          email: author.email,
        },
      })) as any[];

      let authorId = null;

      if (checkExistingAuthor.length > 0) {
        authorId = checkExistingAuthor[0].user_id;
      } else {
        authorId = (await queryInterface.bulkInsert('users', [
          {
            fullname: author.name,
            email: author.email,
            image: author.profile_picture,
            is_verified: author.is_verified,
            phone_number: author.phone,
            created_at: new Date(),
            updated_at: new Date(),
          },
        ])) as any[];
      }

      const checkComic: any[] = (await queryInterface.select(Comic, 'comics', {
        where: {
          title: oldComic.title,
          user_id: authorId,
        },
      })) as any[];

      console.log(`Migrating comic ${oldComic.title}`);

      let newComicId = null;
      let subgenre = '';

      if (oldComic.genre_ids && oldComic.genre_ids !== 'NULL') {
        const subgenreIds = oldComic.genre_ids.split(',');
        subgenre = subgenreIds
          .map(
            (id: string) =>
              genres.find((genre: any) => genre.id === parseInt(id.trim()))
                ?.name,
          )
          .join(', ');
      }

      if (checkComic.length > 0) {
        newComicId = checkComic[0].comic_id;
        console.log('Comic already exists', newComicId);
      } else {
        newComicId = (await queryInterface.bulkInsert('comics', [
          {
            title: oldComic.title || '',
            description: oldComic.synopsis || '',
            comic_type:
              oldComic.comic_type !== 'classic' ? 'webtoon' : 'classic',
            genre: oldComic.genre || 'No Genre',
            subgenres: subgenre || '',
            image: oldComic.cover_photo_large || oldComic.banner_photo || '',
            cover: oldComic.banner_photo_large || oldComic.cover_photo || '',
            banner: oldComic.editor_choice_photo || '',
            user_id: authorId,
            views: oldComic.read_count,
            likes: oldComic.like_count,
            shares: oldComic.share_count,
            status: oldComic.status === 'On Going' ? 'on-going' : 'completed',
            is_editor_choice: oldComic.main_genre_id === 23,
            created_at: new Date(),
            updated_at: new Date(),
          },
        ])) as any[];
        console.log('Comic created', newComicId);
      }

      const chapters = (await oldQueryInterface.sequelize.query(
        `SELECT * FROM chapter WHERE comic_id = '${comicId}'`,
        { type: QueryTypes.SELECT },
      )) as any[];

      for (const chapter of chapters) {
        console.log(`Migrating chapter ${chapter.title}`);

        const checkExistingChapter = (await queryInterface.select(
          Chapter,
          'chapters',
          {
            where: {
              title: chapter.title,
              image: chapter.photo,
              comic_id: newComicId,
            },
          },
        )) as any[];

        let newChapterId = null;
        if (checkExistingChapter.length > 0) {
          newChapterId = checkExistingChapter[0].chapter_id;
          console.log('Chapter already exists', newChapterId);
        } else {
          newChapterId = await queryInterface.bulkInsert('chapters', [
            {
              title: chapter.title || '',
              subtitle: chapter.description || '',
              image: chapter.photo || '',
              comic_id: newComicId,
              views: chapter.read_count,
              likes: chapter.like_count,
              created_at: new Date(),
              updated_at: new Date(),
            },
          ]);
          console.log('Chapter created', newChapterId);
        }

        const pages = (await oldQueryInterface.sequelize.query(
          `SELECT * FROM chapter_content WHERE chapter_id = '${chapter.id}'`,
          { type: QueryTypes.SELECT },
        )) as any[];

        for (const page of pages) {
          const checkExistingPage = (await queryInterface.select(
            Page,
            'pages',
            {
              where: {
                page_number: page.page_no,
                chapter_id: newChapterId,
              },
            },
          )) as any[];

          if (checkExistingPage.length === 0) {
            await queryInterface.bulkInsert('pages', [
              {
                page_number: page.page_no,
                image:
                  page.image_path_h ||
                  page.image_path_m ||
                  page.image_path_l ||
                  '',
                comic_id: newComicId,
                chapter_id: newChapterId,
                lang: 'id',
                created_at: new Date(),
                updated_at: new Date(),
              },
            ]);
          }
        }
      }
    }
  }
}
