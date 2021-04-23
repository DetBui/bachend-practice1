import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { UserCreateSignDto } from './dto/user.createsign.dto';
import { JwtPayload } from './jwt-user/jwt-payload.interface';
import { JwtService } from '@nestjs/jwt';
import { User } from './user.entity';
import { JwtStrategy } from './jwt-user/jwt.strategy';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,

    //token
    private jwtService: JwtService,
    private jwtStrategy: JwtStrategy,
  ) {}

  async signUp(userCreateSign: UserCreateSignDto): Promise<void> {
    return this.userRepository.signUp(userCreateSign);
  }
  async signIn(
    userCreateSign: UserCreateSignDto,
  ): Promise<{ accessToken: string }> {
    //console.log('email')

    const email = await this.userRepository.validateUserPass(userCreateSign);
    console.log(email);

    if (!email) {
      throw new UnauthorizedException();
    }

    //tao token
    const payload: JwtPayload = { email };
    //console.log(await this.jwtStrategy.validate(payload));
    const accessToken = await this.jwtService.sign(payload);
    //console.log(accessToken);

    return { accessToken };
  }

  async getAllUser(): Promise<User[]> {
    return this.userRepository.find();
  }
}
