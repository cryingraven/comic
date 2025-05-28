import { QueryTypes, Sequelize } from 'sequelize';
import { User } from 'src/models/user.model';

export async function migrate_koomik_revenue(
  sequelize: Sequelize,
  oldSequelize: Sequelize,
) {
  const queryInterface = sequelize.getQueryInterface();
  const oldQrueryInterface = oldSequelize.getQueryInterface();

  let fetch = true;
  let page = 0;

  while (fetch) {
    let offset = page * 20;
    let limit = 100;
    page++;
    const users = (await oldSequelize.query(
      `SELECT
          * FROM _user WHERE total_revenue > 0 ORDER BY total_revenue desc
          LIMIT ${limit} OFFSET ${offset}`,
      { type: QueryTypes.SELECT },
    )) as any[];
    if (users.length === 0) {
      fetch = false;
      break;
    }

    for (const user of users) {
      const revenue = user.total_revenue;
      let balance = 0;

      if (revenue > 0) {
        const withdrawals = (await oldSequelize.query(
          `SELECT
            SUM(amount) as total_amount FROM withdrawal
            WHERE user_id = '${user.id}'`,
          { type: QueryTypes.SELECT },
        )) as any[];
        const total_withdrawal = withdrawals[0].total_amount || 0;

        balance = revenue - total_withdrawal;

        await queryInterface.bulkUpdate(
          User.tableName,
          { wallet_balance: balance },
          { email: user.email },
        );
      }

      console.log('Migrating user', user.email, balance);
    }
  }

  console.log('Done migrating koomik revenue');
  process.exit(0);
}
