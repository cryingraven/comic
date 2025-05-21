import { QueryTypes, Sequelize } from 'sequelize';

export async function migrate_koomik_comments(
  sequelize: Sequelize,
  oldSequelize: Sequelize,
) {
  const queryInterface = sequelize.getQueryInterface();

  let fetch = true;
  let page = 0;

  while (fetch) {
    let offset = page * 20;
    let limit = 100;
    page++;
    const comments = (await oldSequelize.query(
      `SELECT
          chapter.title AS chapter_title, 
          chapter.chapter_no, 
          comic.title, 
          comic.id, 
              chapter_comment.comment,
          chapter_comment.user_id, 
          _user.email, 
          chapter_comment.created_at
        FROM
          chapter_comment
              INNER JOIN comic ON chapter_comment.comic_id = comic.id
              INNER JOIN chapter ON chapter_comment.chapter_id = chapter.id
              INNER JOIN _user ON chapter_comment.user_id = _user.id
       LIMIT ${offset},${limit}      
        `,
      { type: QueryTypes.SELECT },
    )) as any[];

    if (comments.length === 0) {
      fetch = false;
    }
    // fetch = false;

    let bulkInsert = [];
    for (const comment of comments) {
      bulkInsert.push(migrateComment(comment, sequelize, queryInterface));
      if (bulkInsert.length === 20) {
        await Promise.all(bulkInsert);
        bulkInsert = [];
      }
    }

    if (bulkInsert.length > 0) {
      await Promise.all(bulkInsert);
      bulkInsert = [];
    }
  }

  console.log('Migrated all comments');
  process.exit(0);
}

async function migrateComment(
  comment: any,
  sequelize: any,
  queryInterface: any,
) {
  console.log('Migrating comment', JSON.stringify(comment, null, 2));
  const checkExisting = (await sequelize.query(
    `SELECT
      chapters.title AS chapter_title, 
      comics.title, 
      comments.content, 
      comments.created_at, 
      users.email
    FROM
      comments
      INNER JOIN
      chapters
      ON 
        comments.chapter_id = chapters.chapter_id
      INNER JOIN
      comics
      ON 
        chapters.comic_id = comics.comic_id
      INNER JOIN
      users
      ON 
      comments.user_id = users.user_id
    WHERE
      email = :email
      AND comics.title = :comicTitle
      AND chapters.title = :chapterTitle
      AND content = :content
      AND comments.created_at = :createdAt`,
    {
      replacements: {
        email: comment.email,
        comicTitle: comment.title,
        chapterTitle: comment.chapter_title,
        content: comment.comment,
        createdAt: comment.created_at
          .toISOString()
          .replace('T', ' ')
          .replace('Z', ''),
      },
      type: QueryTypes.SELECT,
    },
  )) as any[];

  if (checkExisting.length > 0) {
    console.log('Comment already exists');
    return;
  }

  const user = (await sequelize.query(
    `SELECT * FROM users WHERE email = :email`,
    {
      replacements: { email: comment.email },
      type: QueryTypes.SELECT,
    },
  )) as any[];
  if (user.length === 0) {
    console.log('User not found', comment.email);
    return;
  }
  const userId = user[0].user_id;

  const existingChapter = (await sequelize.query(
    `SELECT * FROM chapters INNER JOIN comics ON chapters.comic_id = comics.comic_id
  WHERE chapters.title = :chapterTitle AND comics.title = :comicTitle`,
    {
      replacements: {
        chapterTitle: comment.chapter_title,
        comicTitle: comment.title,
      },
      type: QueryTypes.SELECT,
    },
  )) as any[];
  if (existingChapter.length === 0) {
    console.log('Chapter not found', comment.chapter_title, comment.title);
    return;
  }

  const chapterId = existingChapter[0].chapter_id;

  await queryInterface.bulkInsert('comments', [
    {
      content: comment.comment,
      user_id: userId,
      chapter_id: chapterId,
      created_at: comment.created_at,
    },
  ]);

  console.log('Migrated comment', comment);
}
