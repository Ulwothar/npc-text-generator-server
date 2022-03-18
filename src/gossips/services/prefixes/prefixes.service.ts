import { Injectable } from '@nestjs/common';
import { CreatePrefixDTO } from 'src/gossips/dtos/create-prefix.dto';
import { SearchPrefixDTO } from 'src/gossips/dtos/search-prefix.dto';
import { PrefixRepository } from 'src/gossips/repositories/prefix.repository';
import { Prefix } from 'src/gossips/schemas/prefix.schema';
import { races } from 'src/gossips/types';

@Injectable()
export class PrefixesService {
  constructor(private readonly prefixRepository: PrefixRepository) {}

  async createPrefix(prefix: CreatePrefixDTO): Promise<Prefix> {
    const raceType = this.getRaceType(prefix.race);
    const prefixQuery = {
      raceType: raceType,
      prefix: prefix.prefix,
    };
    const newPrefix = await this.prefixRepository.create(prefixQuery);
    if (!newPrefix) {
      return null;
    }

    return newPrefix;
  }

  async getPrefixesByRace(race: SearchPrefixDTO): Promise<Prefix[]> {
    const raceType = this.getRaceType(race.race);
    const prefixList = await this.prefixRepository.find({ raceType: raceType });
    if (!prefixList || !prefixList.length) {
      return null;
    }

    return prefixList;
  }

  getRaceType(race: string): string {
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
}
