import {
  Controller,
  Post,
  Req,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { BasicResponseDto } from 'src/dto/basicresponse.dto';
import { FirebaseGuard } from 'src/modules/firebase/firebase.guard';
import { StorageService } from 'src/services/storage.service';
import { UserRequest } from 'src/types/user.type';
import { generateUUIDFileName } from 'src/utils/ipfs';

@Controller('file')
export class FileController {
  constructor(private readonly storageService: StorageService) {}

  @Post('upload')
  @UseGuards(FirebaseGuard)
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(
    @UploadedFile() file: Express.Multer.File,
    @Req() req: UserRequest,
  ) {
    console.log(req);
    const url = await this.storageService.uploadFile(
      generateUUIDFileName(),
      file,
    );
    return BasicResponseDto.success('Upload file successfully', url);
  }
}
