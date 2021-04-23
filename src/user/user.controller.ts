import { Body, Controller, Post, ValidationPipe } from '@nestjs/common';
import {
  ApiBody,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { UserCreateSignDto } from './dto/user.createsign.dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Post('/signup')
  @ApiCreatedResponse({ description: 'User signUp' })
  async signUp(
    @Body(ValidationPipe) userCreateSign: UserCreateSignDto,
  ): Promise<void> {
    return this.userService.signUp(userCreateSign);
  }

  @Post('/signin')
  @ApiOkResponse({ description: 'User signIn' })
  @ApiUnauthorizedResponse({ description: 'invalid credentials' })
  @ApiBody({ type: UserCreateSignDto })
  async signIn(
    @Body(ValidationPipe) userCreateSign: UserCreateSignDto,
  ): Promise<{ accessToken: string }> {
    return this.userService.signIn(userCreateSign);
  }
}
