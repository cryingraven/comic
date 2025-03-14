import { Controller, Get, UseGuards } from '@nestjs/common';
import { AppService } from '../services/app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  home(): any {
    return this.appService.getHello();
  }
}
