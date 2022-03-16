import { Injectable } from '@nestjs/common';
import { CreateGossipDTO } from 'src/gossips/dtos/create-gossip.dto';

@Injectable()
export class GossipsService {
  getGossipsByQuery(gossipQuery: CreateGossipDTO) {
    const prefixType: string | null = this.getPrefixType(gossipQuery.race);
    console.log(prefixType);
    const prefix: string | null = this.getPrefix(prefixType);
    console.log(prefix);
    const suffix: string | null = this.getSuffix(gossipQuery.location);
    const gossipBody: string = this.getGossipBody(
      gossipQuery.type,
      gossipQuery.patrons,
      gossipQuery.threat,
    );

    return [`${prefix || ''} ${gossipBody} ${suffix || ''}`];
  }

  getGossips() {
    return ['You were expecting some gossips? not today mate...'];
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
