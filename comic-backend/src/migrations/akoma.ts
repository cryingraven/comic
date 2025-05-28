import { Sequelize } from 'sequelize';
import { MongoClient } from 'mongodb';
import { Comic } from 'src/models/comic.model';
import { User } from 'src/models/user.model';
import { Chapter } from 'src/models/chapter.model';
import { Page } from 'src/models/page.model';

export async function akoma(sequelize: Sequelize, mongoUrl: string) {
  const client = new MongoClient(mongoUrl);
  console.log('Connecting to MongoDB...');
  await client.connect();
  console.log('Connected to MongoDB');
  const db = client.db('paras-comic-mainnet');
  const profileCollection = db.collection('profiles');
  const comicCollection = db.collection('comics');
  const chapterCollection = db.collection('chapters');
  const pageCollection = db.collection('pages');
  const commentsCollection = db.collection('comments');
  const readHistoriesCollection = db.collection('read_histories');
  const queryInterface = sequelize.getQueryInterface();

  const comics = await comicCollection
    .find({
      // comic_id: 'atma',
    })
    .toArray();

  console.log('found', comics.length, 'comics');
  for (const comic of comics) {
    console.log('Migrating comic', comic.comic_id);
    const authorUId = `${comic.comic_id}-akoma`;
    let newAuthorId = null;
    const checkAuthor: any[] = (await queryInterface.select(User, 'users', {
      where: {
        firebase_uid: authorUId,
      },
    })) as any[];

    if (checkAuthor.length > 0) {
      console.log('Author already exists');
      newAuthorId = checkAuthor[0].user_id;
    } else {
      console.log('Creating new author');
      newAuthorId = await queryInterface.bulkInsert('users', [
        {
          firebase_uid: authorUId,
          fullname: comic.authors[0] || 'Akoma',
          email: `creator-akoma@akoma.xyz`,
          image: 'https://images.24comic.com/assets/rocketkoo.png',
          is_verified: true,
          is_verified_author: true,
          has_notification: false,
          created_at: new Date(),
          updated_at: new Date(),
        },
      ]);
    }

    console.log('Creating comic');

    const checkComic: any[] = (await queryInterface.select(Comic, 'comics', {
      where: {
        title: comic.title_id,
        user_id: newAuthorId,
      },
    })) as any[];

    let comicId = null;
    if (checkComic.length > 0) {
      console.log('Comic already exists');
      comicId = checkComic[0].comic_id;
    } else {
      console.log('Creating new comic');
      const countComments = await commentsCollection.countDocuments({
        comic_id: comic.comic_id,
      });

      comicId = await queryInterface.bulkInsert('comics', [
        {
          title: comic.title_id,
          description: comic.description_id,
          image: comic.media,
          cover: comic.media_cover,
          banner: comic.media_banner,
          status: comic.status === 'ONGOING' ? 'on-going' : 'completed',
          comic_type: 'webtoon',
          user_id: newAuthorId,
          genre: comic.genre,
          subgenres: `${comic.subgenre}, Exclusive Comic`,
          views: comic.total_views || 0,
          likes: comic.totalLikes || 0,
          subscribers: comic.total_subscribers || 0,
          shares: 0,
          comments: countComments || 0,
          is_editor_choice: true,
          created_at: new Date(),
          updated_at: new Date(),
        },
      ]);
    }

    // console.log(newAuthor);

    const chapters = await chapterCollection
      .find({
        'metadata.comic_id': comic.comic_id,
      })
      .toArray();
    for (const chapter of chapters) {
      let chapterId = null;
      const checkChapter: any[] = (await queryInterface.select(
        Chapter,
        'chapters',
        {
          where: {
            title: chapter.metadata.subtitle_id || '',
            comic_id: comicId,
          },
        },
      )) as any[];

      if (checkChapter.length > 0) {
        console.log('Chapter already exists');
        chapterId = checkChapter[0].chapter_id;
      } else {
        console.log('Creating new chapter');
        const totalViews = await readHistoriesCollection.countDocuments({
          chapter_id: chapter.metadata.chapter_id,
          comic_id: comic.comic_id,
        });
        chapterId = await queryInterface.bulkInsert('chapters', [
          {
            title: chapter.metadata.subtitle_id,
            subtitle: chapter.metadata.subtitle_id,
            image: chapter.metadata.media,
            price: 0,
            comic_id: comicId,
            likes: chapter.totalLikes || 0,
            views: totalViews || 0,
            shares: 0,
            comments: chapter.totalComments || 0,
            created_at: new Date(),
            updated_at: new Date(),
          },
        ]);
      }

      const pages = await pageCollection
        .find({
          comic_id: comic.comic_id,
          chapter_id: chapter.metadata.chapter_id,
          lang: 'id',
        })
        .toArray();
      for (const page of pages) {
        let pageId = null;
        const checkPage: any[] = (await queryInterface.select(Page, 'pages', {
          where: {
            comic_id: comicId,
            chapter_id: chapterId,
            page_number: page.page_id,
            lang: 'id',
          },
        })) as any[];

        if (checkPage.length > 0) {
          console.log('Page already exists');
          pageId = checkPage[0].page_id;
        } else {
          console.log('Creating new page');
          pageId = await queryInterface.bulkInsert('pages', [
            {
              page_number: page.page_id,
              image: page.content,
              comic_id: comicId,
              chapter_id: chapterId,
              lang: 'id',
              created_at: new Date(),
              updated_at: new Date(),
            },
          ]);
        }

        console.log('Page created', pageId);
      }
    }
  }

  process.exit(0);
}
