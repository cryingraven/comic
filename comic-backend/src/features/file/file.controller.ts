import { Controller } from '@nestjs/common';
import { StorageService } from 'src/services/storage.service';

@Controller('file')
export class FileController {
  constructor(private readonly storageService: StorageService) {}
}
