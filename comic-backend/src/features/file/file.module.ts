import { Module } from '@nestjs/common';
import { StorageService } from 'src/services/storage.service';

@Module({
  imports: [],
  controllers: [],
  providers: [StorageService],
  exports: [StorageService],
})
export class FileModule {
  constructor() {}
}
