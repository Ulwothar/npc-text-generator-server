import { IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { locations } from '../types';

export class SearchSuffixDTO {
  constructor(private readonly passedLocation: string) {
    this.location = passedLocation;
  }
  @IsNotEmpty()
  @IsString()
  @IsEnum(locations)
  location: string;
}
