import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRepository } from './user.repository';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './jwt-user/jwt.strategy';
import { MyModule } from './console/module';

@Module({
  imports: [
    // cau hinh de tao va quy dinh cho tocken
    PassportModule.register({ defaultStrategy: 'jwt' }),

    JwtModule.register({
      secret: 'topSecret51',
      signOptions: { expiresIn: 1800 },
    }),
    // end

    TypeOrmModule.forFeature([UserRepository]),
    MyModule,
  ],

  controllers: [UserController],
  providers: [UserService, JwtStrategy],

  exports: [JwtModule, PassportModule, UserService],
})
export class UserModule {}
