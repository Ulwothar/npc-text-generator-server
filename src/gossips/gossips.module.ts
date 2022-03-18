import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { GossipsController } from './controllers/gossips/gossips.controller';
import { GossipRepository } from './repositories/gossip.repository';
import { PrefixRepository } from './repositories/prefix.repository';
import { SuffixRepository } from './repositories/suffix.repository';
import { Gossip, GossipSchema } from './schemas/gossip.schema';
import { Prefix, PrefixSchema } from './schemas/prefix.schema';
import { Suffix, SuffixSchema } from './schemas/suffix.schema';
import { GossipsService } from './services/gossips/gossips.service';
import { PrefixesService } from './services/prefixes/prefixes.service';
import { SuffixesService } from './services/suffixes/suffixes.service';
import { SuffixesController } from './controllers/suffixes/suffixes.controller';
import { PrefixesController } from './controllers/prefixes/prefixes.controller';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Gossip.name, schema: GossipSchema },
      { name: Prefix.name, schema: PrefixSchema },
      { name: Suffix.name, schema: SuffixSchema },
    ]),
  ],
  controllers: [GossipsController, SuffixesController, PrefixesController],
  providers: [
    GossipsService,
    GossipRepository,
    PrefixRepository,
    SuffixRepository,
    PrefixesService,
    SuffixesService,
  ],
})
export class GossipsModule {}
