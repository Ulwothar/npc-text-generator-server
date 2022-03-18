import { Injectable } from '@nestjs/common';
import { CreateSuffixDTO } from 'src/gossips/dtos/create-suffix.dto';
import { SuffixRepository } from 'src/gossips/repositories/suffix.repository';
import { Suffix } from 'src/gossips/schemas/suffix.schema';

@Injectable()
export class SuffixesService {
  constructor(private readonly suffixRepository: SuffixRepository) {}

  async createSuffix(suffix: CreateSuffixDTO): Promise<Suffix> {
    const newSuffix = await this.suffixRepository.create(suffix);
    if (!newSuffix) {
      return null;
    }

    return newSuffix;
  }

  async getSuffixByLocation(location: Partial<Suffix>): Promise<Suffix[]> {
    const suffixList = await this.suffixRepository.find(location);
    if (!suffixList || !suffixList.length) {
      return null;
    }
    return suffixList;
  }
}
