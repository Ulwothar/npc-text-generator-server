import { Module } from '@nestjs/common';
import { AppController, NameController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [],
  controllers: [AppController, NameController],
  providers: [AppService],
})
export class AppModule {}
