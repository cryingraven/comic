import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class StorageService {
  private s3Client: S3Client;
  private bucketName: string = 'images';
  constructor(private configService: ConfigService) {
    const accessKeyId = this.configService.get<string>('S3_ACCESS_KEY_ID');
    const secretAccessKey = this.configService.get<string>('S3_SECRET_KEY');
    const endpoint = this.configService.get<string>('S3_ENDPOINT');
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

  public async saveFile(fileName: string, buffer: Buffer, mimetype: string) {
    const params = {
      Bucket: this.bucketName,
      Key: fileName,
      Body: buffer,
      ContentType: mimetype,
    };
    const command = new PutObjectCommand(params);
    await this.s3Client.send(command);
    return fileName;
  }
}
