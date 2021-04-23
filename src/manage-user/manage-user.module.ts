import { Module } from '@nestjs/common';
import { ManageUserController } from './manage-user.controller';
import { ManageUserService } from './manage-user.service';
import { UserModule } from '../user/user.module';
import { ManageUserRepository } from './manage-user.repository';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [UserModule, TypeOrmModule.forFeature([ManageUserRepository])],
  controllers: [ManageUserController],
  providers: [ManageUserService],
})
export class ManageUserModule {}
