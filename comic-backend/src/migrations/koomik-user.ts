import { Sequelize } from 'sequelize';
import { User } from 'src/models/user.model';
import { FirebaseService } from 'src/modules/firebase/firebase.service';

export async function migrate_koomik_user(
  sequelize: Sequelize,
  oldSequelize: Sequelize,
  firebaseService: FirebaseService,
) {
  const queryInterface = sequelize.getQueryInterface();
  const oldQueryInterface = oldSequelize.getQueryInterface();

  const users = (await oldQueryInterface.select(null, '_user', {
    where: {},
  })) as any[];

  const processUser = async (user: any) => {
    console.log(user.email);

    let newUser: User | null;
    const checkUser = (await queryInterface.select(User, 'users', {
      where: {
        email: user.email,
      },
    })) as User[];

    if (checkUser.length > 0) {
      newUser = checkUser[0];

      if (newUser.firebase_uid) return;
    } else {
      const newUserId = await queryInterface.bulkInsert('users', [
        {
          fullname: user.name,
          email: user.email,
          image: user.profile_picture,
          is_verified: user.is_verified,
          phone_number: user.phone,
          created_at: new Date(),
          updated_at: new Date(),
        },
      ]);

      const result = (await queryInterface.select(User, 'users', {
        where: {
          user_id: newUserId,
        },
      })) as User[];

      newUser = result[0];
    }

    try {
      const userRecord = await firebaseService
        .getAuth()
        .getUserByEmail(user.email);
      newUser.firebase_uid = userRecord.uid;
      await newUser.save();
    } catch (e) {
      try {
        const userRecord = await firebaseService.getAuth().createUser({
          email: user.email,
          password: '2025@Koomik',
        });
        newUser.firebase_uid = userRecord.uid;
        await newUser.save();
      } catch (e) {
        console.log(e);
      }
    }
  };

  const batchSize = 20;
  for (let i = 0; i < users.length; i += batchSize) {
    const batch = users.slice(i, i + batchSize);
    await Promise.all(batch.map(processUser));
  }

  console.log('Done');

  process.exit(0);
}
