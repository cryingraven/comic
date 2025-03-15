import { Sequelize } from 'sequelize';
import { MongoClient } from 'mongodb';
import { Comic } from 'src/models/comic.model';
import { User } from 'src/models/user.model';

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
  const queryInterface = sequelize.getQueryInterface();

  const comics = await comicCollection
    .find({
      comic_id: 'atma',
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

    console.log('Creating new comic');

    const newComic = await queryInterface.bulkInsert('comics', [
      {
        title: comic.title,
        description: comic.description,
        image: comic.media,
        cover: comic.media_cover,
        banner: comic.media_banner,
        status: 'ONGOING',
        comic_type: 'continous',
        user_id: newAuthorId,
        genre: `${comic.genre},${comic.sub_genre}`,
        views: comic.toatal_views || 0,
        likes: comic.totalLikes || 0,
        shares: comic.totalShares || 0,
        comments: comic.comments || 0,
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]);

    // console.log(newAuthor);

    // const chapters = await chapterCollection
    //   .find({
    //     'metadata.comic_id': comic.comic_id,
    //   })
    //   .toArray();x
    // for (const chapter of chapters) {
    //   const pages = await pageCollection
    //     .find({
    //       comic_id: comic.comic_id,
    //       chapter_id: chapter.metadata.chapter_id,
    //     })
    //     .toArray();
    //   for (const page of pages) {
    //   }
    // }
  }
}
