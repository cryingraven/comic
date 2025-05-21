import { MongoClient } from 'mongodb';
import { Sequelize } from 'sequelize';
import { User } from 'src/models/user.model';
import { FirebaseService } from 'src/modules/firebase/firebase.service';

export async function migrate_akoma_user(
  sequelize: Sequelize,
  mongoUrl: string,
  firebaseService: FirebaseService,
) {
  const client = new MongoClient(mongoUrl);
  console.log('Connecting to MongoDB...');
  await client.connect();
  console.log('Connected to MongoDB');
  const db = client.db('paras-comic-mainnet');
  const profileCollection = db.collection('profiles');
  const queryInterface = sequelize.getQueryInterface();
  const auth = firebaseService.getAuth();
  const profiles = await profileCollection.find();

  let bulk = []
  while (await profiles.hasNext()) {
    const profile = await profiles.next();

    bulk.push(processData(profile, queryInterface, auth));
    if (bulk.length > 20) {
      await Promise.all(bulk);
      bulk = [];
    }
  }

  console.log('Done');
  process.exit(0);
}

async function processData(profile: any, queryInterface: any, auth: any) {
  console.log(profile);

  let userId = null;

  try {
    const userRecord = await auth.getUserByEmail(profile.email);
    userId = userRecord.uid;

    const checkUser = (await queryInterface.select(User, 'users', {
      where: {
        firebase_uid: userId,
      },
    })) as any[];
    if (checkUser.length > 0) {
      console.log('User already exists');
      return checkUser[0].firebase_uid;
    }

    await queryInterface.bulkInsert('users', [
      {
        firebase_uid: userId,
        fullname: profile.name || 'Akoma User',
        email: profile.email || `user-akoma@akoma.xyz`,
        image: 'https://images.24comic.com/assets/rocketkoo.png',
        is_verified: true,
        is_verified_author: true,
        has_notification: false,
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]);

    return userId;
  } catch (e) {
    console.log(e);
  }
}
