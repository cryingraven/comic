import { Module } from '@nestjs/common';
import { StorageService } from 'src/services/storage.service';
import { FileController } from './file.controller';
import { FirebaseModule } from 'src/modules/firebase/firebase.module';

@Module({
  imports: [FirebaseModule],
  controllers: [FileController],
  providers: [StorageService],
  exports: [StorageService],
})
export class FileModule {
  constructor() {}
}
