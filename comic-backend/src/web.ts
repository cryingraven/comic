import { NestFactory } from '@nestjs/core';
import { AppModule } from './modules/app.module';

export async function web() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  await app.listen(process.env.PORT ?? 3000);
}
