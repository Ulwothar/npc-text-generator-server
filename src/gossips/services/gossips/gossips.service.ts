import { Injectable } from '@nestjs/common';
import { CreateGossipDTO } from 'src/gossips/dtos/create-gossip.dto';
import { SearchGossipDTO } from 'src/gossips/dtos/search-gossip.dto';
import { SearchPrefixDTO } from 'src/gossips/dtos/search-prefix.dto';
import { SearchSuffixDTO } from 'src/gossips/dtos/search-suffix.dto';
import { GossipRepository } from 'src/gossips/repositories/gossip.repository';
import { PrefixesService } from '../prefixes/prefixes.service';
import { SuffixesService } from '../suffixes/suffixes.service';

@Injectable()
export class GossipsService {
  constructor(
    private readonly gossipRepository: GossipRepository,
    private readonly prefixService: PrefixesService,
    private readonly suffixService: SuffixesService,
  ) {}

  async getGossipsByQuery(gossipQuery: SearchGossipDTO) {
    const race = new SearchPrefixDTO(gossipQuery.race);
    const location = new SearchSuffixDTO(gossipQuery.location);
    const gossips = await this.gossipRepository.find(gossipQuery);
    if (!gossips) {
      return null;
    }

    const prefixes = await this.prefixService.getPrefixesByRace(race);
    const suffixes = await this.suffixService.getSuffixByLocation(location);

    // const prefixType: string | null = this.getPrefixType(gossipQuery.race);
    // console.log(prefixType);
    // const prefix: string | null = this.getPrefix(prefixType);
    // console.log(prefix);
    // const suffix: string | null = this.getSuffix(gossipQuery.location);
    // const gossipBody: string = this.getGossipBody(
    //   gossipQuery.type,
    //   gossipQuery.patrons,
    //   gossipQuery.threat,
    // );

    gossips.forEach((gossip) => {
      if (prefixes) {
        if (suffixes) {
          const prefixIndex = Math.floor(Math.random() * prefixes.length);
          const suffixIndex = Math.floor(Math.random() * suffixes.length);
          gossip.gossip = `${prefixes[prefixIndex].prefix || ''} ${
            gossip.gossip
          } ${suffixes[suffixIndex].suffix || ''}`;
        } else {
          const prefixIndex = Math.floor(Math.random() * prefixes.length);
          gossip.gossip = `${prefixes[prefixIndex].prefix || ''} ${
            gossip.gossip
          }`;
        }
      } else if (!prefixes && suffixes) {
        const suffixIndex = Math.floor(Math.random() * suffixes.length);
        gossip.gossip = `${gossip.gossip} ${
          suffixes[suffixIndex].suffix || ''
        }`;
      }
    });

    return gossips;

    // return [`${prefix || ''} ${gossipBody} ${suffix || ''}`];
  }

  async getGossips() {
    const gossips = await this.gossipRepository.findAll();
    if (!gossips) {
      return null;
    }
    return gossips;
    // return ['You were expecting some gossips? not today mate...'];
  }

  async createGossip(gossip: CreateGossipDTO) {
    const newGossip = this.gossipRepository.create(gossip);
    if (!newGossip) {
      return null;
    }
    return newGossip;
  }

  getPrefixType(race: string): string {
    console.log({ race: race });
    switch (race) {
      case 'human':
        return 'humanLike';
        break;
      case 'halfling':
        return 'humanLike';
        break;
      case 'wooden elf':
        return 'elf';
        break;
      case 'dwarf':
        return 'dwarfLike';
        break;
      case 'gnome':
        return 'dwarfLike';
        break;
      default:
        return null;
        break;
    }
  }

  getPrefix(prefixType: string): string {
    console.log({ prefixType: prefixType });
    switch (prefixType) {
      case 'humanLike':
        return `Listen, you don't know this from me, but`;
        break;
      case 'elf':
        return `One of our guests told me that`;
        break;
      case 'dwarfLike':
        return `Aye, did ya hear`;
        break;
      default:
        return null;
    }
  }

  getSuffix(location: string): string {
    switch (location) {
      case 'village':
        return `What a news! Right?`;
        break;
      case 'town':
        return `What do you think?`;
        break;
      case 'capital town':
        return `Well, welcome to the big city problems...`;
        break;
      case 'wilderness':
        return `At least wolves didn't eat us. Yet!`;
        break;
      default:
        return null;
        break;
    }
  }

  getGossipBody(type: string, patrons: string, threat: string) {
    if (threat && threat !== 'none') {
      return `it is a ${type}. Most of our customers are ${patrons}. The threat today is ${threat}.`;
    } else {
      return `it is a ${type}. Most of our customers are ${patrons}. There is no threat today!`;
    }
  }
}
