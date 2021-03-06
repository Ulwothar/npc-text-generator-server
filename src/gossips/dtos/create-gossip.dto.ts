import { IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { types, patrons, threat } from '../types/index';

export class CreateGossipDTO {
  @IsNotEmpty()
  @IsString()
  @IsEnum(types)
  type: types;

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
