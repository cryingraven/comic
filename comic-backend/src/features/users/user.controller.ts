import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { FirebaseGuard } from 'src/modules/firebase/firebase.guard';
import { BasicResponseDto } from 'src/dto/basicresponse.dto';
import { UserRequest } from 'src/types/user.type';
import { SaveProfileDTO } from 'src/dto/saveprofile.dto';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('/me')
  @UseGuards(FirebaseGuard)
  async me(@Req() req: UserRequest): Promise<BasicResponseDto> {
    const firebaseUid = req.user.uid;
    const profile = await this.userService.getUserProfile(firebaseUid);

    return BasicResponseDto.success('success', profile);
  }

  @Post()
  @UseGuards(FirebaseGuard)
  async saveProfile(@Body() body: SaveProfileDTO, @Req() req: UserRequest) {
    const firebaseUid = req.user.uid;

    const result = await this.userService.saveProfile(firebaseUid, body);

    return BasicResponseDto.success('success', result);
  }
}
