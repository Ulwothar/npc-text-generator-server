import { Module } from '@nestjs/common';
import { GossipsModule } from './gossips/gossips.module';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    GossipsModule,
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.DATABASE_URI),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
