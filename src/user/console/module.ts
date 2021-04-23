import { Module } from '@nestjs/common';
import { ConsoleModule } from 'nestjs-console';
import { ConsoleRepository } from './console.repository';
import { MyService } from './service';

@Module({
  imports: [
    ConsoleModule, // import the ConsoleModule
  ],
  providers: [MyService, ConsoleRepository],
  exports: [MyService],
})
export class MyModule {}
