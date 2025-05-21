import { MongoClient } from 'mongodb';
import { Sequelize } from 'sequelize';
import { Chapter } from 'src/models/chapter.model';
import { User } from 'src/models/user.model';
import { pipeline } from 'stream';

export async function akoma_comments(sequelize: Sequelize, mongoUrl: string) {
  const client = new MongoClient(mongoUrl);
  console.log('Connecting to MongoDB...');
  await client.connect();
  console.log('Connected to MongoDB');
  const db = client.db('paras-comic-mainnet');
  const commentsCollection = db.collection('comments');
  const queryInterface = sequelize.getQueryInterface();

  const comments = commentsCollection.aggregate([
    {
      $lookup: {
        from: 'profiles',
        localField: 'account_id',
        foreignField: 'account_id',
        as: 'user',
      },
    },
    {
      $unwind: '$user',
    },
    {
      $lookup: {
        from: 'chapters',
        let: { chapter_id: '$chapter_id', comic_id: '$comic_id' },
        pipeline: [
          {
            $match: {
              $expr: {
                $and: [
                  { $eq: ['$metadata.chapter_id', '$$chapter_id'] },
                  { $eq: ['$metadata.comic_id', '$$comic_id'] },
                ],
              },
            },
          },
        ],
        as: 'chapter',
      },
    },
    {
      $unwind: '$chapter',
    },
    {
      $project: {
        _id: 1,
        body: 1,
        issued_at: 1,
        user: 1,
        chapter: '$chapter.metadata',
      },
    },
  ]);

  async function processComment(comment: any, queryInterface: any) {
    console.log('Processing comment', comment._id);
    const user = comment.user;
    const chapter = comment.chapter;
    if (!user || !chapter) {
      return;
    }

    if (!user.email) {
      return;
    }

    const existingChapters = (await queryInterface.select(Chapter, 'chapters', {
      where: {
        image: chapter.media_thumb,
        subtitle: chapter.subtitle,
      },
    })) as Chapter[];

    if (existingChapters.length === 0) {
      return;
    }

    const existingUsers = (await queryInterface.select(User, 'users', {
      where: {
        email: user.email,
      },
    })) as User[];
    if (existingUsers.length === 0) {
      return;
    }

    const existingChapter = existingChapters[0];
    const existingUser = existingUsers[0];
    const commentId = await queryInterface.bulkInsert('comments', [
      {
        user_id: existingUser.user_id,
        chapter_id: existingChapter.chapter_id,
        content: comment.body,
        created_at: new Date(comment.issued_at),
        updated_at: new Date(),
      },
    ]);

    console.log('Inserted comment', commentId);
  }

  let bulk = [];
  while (await comments.hasNext()) {
    const comment = await comments.next();

    if (comment) {
      bulk.push(processComment(comment, queryInterface));

      console.log('Processing comment', JSON.stringify(comment, null, 2));
      if (bulk.length === 20) {
        await Promise.all(bulk);
        bulk = [];
      }
    }
  }

  // Process any remaining comments in the bulk array
  if (bulk.length > 0) {
    await Promise.all(bulk);
  }

  console.log('Done');
  process.exit(0);
}
