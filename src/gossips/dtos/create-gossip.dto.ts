import { IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { locations, patrons, threat } from '../types/index';

export class CreateGossipDTO {
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
  gossip: string;
}
