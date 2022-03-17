import { IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { types, locations, patrons, threat, races } from '../types/index';

export class SearchGossipDTO {
  @IsNotEmpty()
  @IsString()
  @IsEnum(types)
  type: types;

  @IsNotEmpty()
  @IsString()
  @IsEnum(locations)
  location: locations;

  @IsNotEmpty()
  @IsString()
  @IsEnum(patrons)
  patrons: patrons;

  @IsNotEmpty()
  @IsString()
  @IsEnum(threat)
  threat: threat;

  @IsNotEmpty()
  @IsString()
  @IsEnum(races)
  race: races;
}
