import { QueryTypes, Sequelize } from 'sequelize';
import { createSlug } from 'src/utils/slug';

export async function koomik(sequelize: Sequelize, oldSequelize: Sequelize) {
  const queryInterface = sequelize.getQueryInterface();
  const oldQueryInterface = oldSequelize.getQueryInterface();

  const oldGenres = (await oldQueryInterface.sequelize.query(
    'SELECT * FROM `genre`',
    { type: QueryTypes.SELECT },
  )) as any[];

  for (const oldGenre of oldGenres) {
    const checkSlug = await queryInterface.sequelize.query(
      `SELECT * FROM genres WHERE slug = '${createSlug(oldGenre.name)}'`,
      { type: QueryTypes.SELECT },
    );
    if (checkSlug.length < 1) {
      await queryInterface.bulkInsert('genres', [
        {
          id: oldGenre.id,
          name: oldGenre.name,
          slug: createSlug(oldGenre.name),
          created_at: oldGenre.created_at,
          updated_at: oldGenre.updated_at,
        },
      ]);
    }

    console.log(`Inserted genre ${oldGenre.name}`);
  }
}
