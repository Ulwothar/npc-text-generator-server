import { IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { types } from '../types';

export class SearchSuffixDTO {
  constructor(private readonly passedType: string) {
    this.type = passedType;
  }
  @IsNotEmpty()
  @IsString()
  @IsEnum(types)
  type: string;
}
