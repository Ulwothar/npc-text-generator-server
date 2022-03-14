import { Module } from '@nestjs/common';
import { GossipsController } from './gossips/controllers/gossips/gossips.controller';
import { GossipsService } from './gossips/services/gossips/gossips.service';
import { GossipsModule } from './gossips/gossips.module';

@Module({
  imports: [GossipsModule],
  controllers: [GossipsController],
  providers: [GossipsService],
})
export class AppModule {}
