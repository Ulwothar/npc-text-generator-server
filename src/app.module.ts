import { Module } from '@nestjs/common';
import { GossipsController } from './gossips/controllers/gossips/gossips.controller';
import { GossipsService } from './gossips/services/gossips/gossips.service';
import { GossipsModule } from './gossips/gossips.module';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    GossipsModule,
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.DATABASE_URI),
  ],
  controllers: [GossipsController],
  providers: [GossipsService],
})
export class AppModule {}
