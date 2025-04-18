import { Module } from '@nestjs/common';
import { FirebaseService } from 'src/modules/firebase/firebase.service';

@Module({
  imports: [],
  controllers: [],
  providers: [FirebaseService],
  exports: [FirebaseService],
})
export class FirebaseModule {}
