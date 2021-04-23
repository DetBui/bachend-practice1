import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user/user.entity';
import { ManageUserModule } from './manage-user/manage-user.module';
import { MyModule } from './user/console/module';
import { ConsoleModule } from 'nestjs-console';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mongodb',
      url: 'mongodb://localhost/practice1',
      synchronize: true,
      useUnifiedTopology: true,
      entities: [User],

    }),
    ConsoleModule,

    UserModule,
    ManageUserModule,
    MyModule,
  ],
})
export class AppModule {}
