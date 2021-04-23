import { Controller, Get, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ManageUserService } from './manage-user.service';
import { User } from '../user/user.entity';
import { ApiBearerAuth } from '@nestjs/swagger';
//import { GetUser } from 'src/user/get-user.decorator';

@Controller('manage-user')
@UseGuards(AuthGuard('jwt'))
export class ManageUserController {
  constructor(private manageUserService: ManageUserService) {}

  @Get()
  @ApiBearerAuth()
  
  GetAllUser(): //@GetUser() user: User
  Promise<User[]> {
    console.log('sdfsdf');
    return this.manageUserService.getAllUser();
  }
}
