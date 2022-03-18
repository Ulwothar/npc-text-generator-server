import { IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { races } from '../types';

export class SearchPrefixDTO {
  constructor(private readonly passedRace: string) {
    this.race = passedRace;
  }
  @IsNotEmpty()
  @IsString()
  @IsEnum(races)
  race: string;
}
