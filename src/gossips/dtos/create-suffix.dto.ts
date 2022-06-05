import { IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { types } from '../types';

export class CreateSuffixDTO {
  @IsNotEmpty()
  @IsString()
  @IsEnum(types)
  type: types;

  @IsNotEmpty()
  @IsString()
  suffix: string;
}
