import { Sequelize } from 'sequelize';
import { User } from 'src/models/user.model';
import { FirebaseService } from 'src/modules/firebase/firebase.service';

export async function migrate_firebase(
  sequelize: Sequelize,
  firebaseService: FirebaseService,
) {
  const queryInterface = sequelize.getQueryInterface();
  const auth = firebaseService.getAuth();

  const listUsers = (await queryInterface.select(User, 'users', {
    where: {
      firebase_uid: null,
    },
  })) as User[];

  console.log(listUsers.length, 'users');

  for (const user of listUsers) {
    console.log(user.email);
    try {
      const userRecord = await auth.getUserByEmail(user.email);

      user.firebase_uid = userRecord.uid;
      await user.save();
    } catch (e) {
      try {
        const userRecord = await auth.createUser({
          email: user.email,
          password: '2025@Koomik',
        });

        user.firebase_uid = userRecord.uid;
        await user.save();
      } catch (e) {
        console.log(e);
        console.log(user.email);
      }
    }
  }

  process.exit(0);
}
