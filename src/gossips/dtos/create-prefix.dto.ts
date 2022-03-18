import { IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { races } from '../types';

export class CreatePrefixDTO {
  @IsNotEmpty()
  @IsString()
  @IsEnum(races)
  race: races;

  @IsNotEmpty()
  @IsString()
  prefix: string;
}
