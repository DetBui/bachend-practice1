import {
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';
import { Repository, EntityRepository } from 'typeorm';
import { v1 as uuid } from 'uuid';
import * as bcrypt from 'bcryptjs';
import { User } from '../user.entity';
import { createSpinner } from 'nestjs-console';

@EntityRepository(User)
export class ConsoleRepository extends Repository<User> {
  async signUp(email: string, password: string): Promise<void> {
    const spin = createSpinner();
    const salt = await bcrypt.genSalt();
    const hashPassword = await bcrypt.hash(password, salt);

    try {
      await User.insert({
        id: uuid(),
        email: email,
        password: hashPassword,
      });
      spin.succeed(
        `SignUp email  ${email} and pass  ${password} Successful!\n`,
      );
      console.log('Successful!');
    } catch (error) {
      spin.fail(`has some error\n`);

      if (error.code == 11000) {
        spin.fail(`cannot use this email\n`);
        throw new ConflictException('email already exists');
      } else {
        spin.fail(`has error with code ${error.code}\n`);
        throw new InternalServerErrorException('');
      }
    }
  }
}
