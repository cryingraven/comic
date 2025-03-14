import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class StorageService {
  private s3Client: S3Client;
  private bucketName: string = 'comic-pages';
  constructor(private configService: ConfigService) {
    const accessKeyId = this.configService.get<string>('R2_ACCESS_KEY_ID');
    const secretAccessKey = this.configService.get<string>('R2_SECRET_KEY');
    const endpoint = this.configService.get<string>('R2_ENDPOINT');
    this.s3Client = new S3Client({
      region: 'auto',
      endpoint,
      credentials: {
        accessKeyId,
        secretAccessKey,
      },
    });
  }

  public async uploadFile(fileName: string, file: Express.Multer.File) {
    const params = {
      Bucket: this.bucketName,
      Key: fileName,
      Body: file.buffer,
      ContentType: file.mimetype,
    };
    const command = new PutObjectCommand(params);
    await this.s3Client.send(command);

    return fileName;
  }

  public async getFileURL(fileName: string) {
    return `https://images.24comic.com/${fileName}`;
  }
}
