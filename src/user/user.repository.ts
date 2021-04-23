import {
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';
import { Repository, EntityRepository } from 'typeorm';
import { User } from './user.entity';
import { UserCreateSignDto } from './dto/user.createsign.dto';
import { v1 as uuid } from 'uuid';
import * as bcrypt from 'bcryptjs';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  async signUp(userCreateSign: UserCreateSignDto): Promise<void> {
    const { email, password } = userCreateSign;
    const salt = await bcrypt.genSalt();
    const hashPassword = await bcrypt.hash(password, salt);

    try {
      await this.insert({
        id: uuid(),
        email: email,
        password: hashPassword,
      });
    } catch (error) {
      if (error.code == 11000) {
        throw new ConflictException('email already exists');
      } else {
        throw new InternalServerErrorException('ERROR');
      }
    }
  }

  async validateUserPass(userCreateSign: UserCreateSignDto): Promise<string> {
    const { email, password } = userCreateSign;

    const user = await this.findOne({ email });

    //console.log('validatepass',await user.validatePass(password));
    if (user && (await user.validatePass(password)) == true) {
      return user.email;
    } else {
      return null;
    }
  }
}
