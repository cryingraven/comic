import { Controller, Get, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  home(): any {
    return this.userService.getAll();
  }
}
