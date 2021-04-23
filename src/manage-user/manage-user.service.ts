import { Injectable } from '@nestjs/common';
import { User } from '../user/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { ManageUserRepository } from './manage-user.repository';

@Injectable()
export class ManageUserService {
  constructor(
    @InjectRepository(ManageUserRepository)
    private manageUserrepository: ManageUserRepository,
  ) {}

  getAllUser(): Promise<User[]> {
    return this.manageUserrepository.find();
  }
}
