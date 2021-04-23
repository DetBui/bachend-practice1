import { Console, Command, createSpinner } from 'nestjs-console';
import { InjectRepository } from '@nestjs/typeorm';
import { ConsoleRepository } from './console.repository';

import { InternalServerErrorException } from '@nestjs/common';

@Console()
export class MyService {
  constructor(
    @InjectRepository(ConsoleRepository)
    private consoleRepository: ConsoleRepository,
  ) {}
  @Command({
    command: 'signUp <arg1> <arg2>',
    description: 'List content of a directory',
  })
  async cosoleSingUp(email: string, password: string): Promise<void> {
    const spin = createSpinner();

    const checkPass = /^(?=\S*[a-z])(?=\S*[A-Z])(?=\S*\d)(?=\S*[^\w\s])\S{5,15}$/;
    const checkEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    //const format = /[ !#$%^&*()_+\-=\[\]{};':"\\|,<>\/?]/;||format.test(email)
    spin.start(`Check validate email\n`);
    if (!checkEmail.test(email)) {
      spin.fail(`Invalid email\n`);
      throw new InternalServerErrorException('The email is not valid');
    }
    spin.succeed(`Email is in the correct format\n`);
    spin.start(`Check validate password\n`);
    if (!checkPass.test(password)) {
      spin.fail(`Invalid password\n`);
      throw new InternalServerErrorException('The password is not valid');
    }
    spin.succeed(`Password is in the correct format\n`);

    return await this.consoleRepository.signUp(email, password);
  }
}
