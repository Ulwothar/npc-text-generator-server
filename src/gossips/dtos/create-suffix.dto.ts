import { IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { locations } from '../types';

export class CreateSuffixDTO {
  @IsNotEmpty()
  @IsString()
  @IsEnum(locations)
  location: locations;

  @IsNotEmpty()
  @IsString()
  suffix: string;
}
