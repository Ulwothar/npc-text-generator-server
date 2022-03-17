import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { GossipsController } from './controllers/gossips/gossips.controller';
import { GossipRepository } from './repositories/gossip.repository';
import { Gossip, GossipSchema } from './schemas/gossip.schema';
import { GossipsService } from './services/gossips/gossips.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Gossip.name, schema: GossipSchema }]),
  ],
  controllers: [GossipsController],
  providers: [GossipsService, GossipRepository],
})
export class GossipsModule {}
