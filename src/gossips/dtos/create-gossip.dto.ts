import { IsEnum, IsNotEmpty, IsString } from 'class-validator';

enum types {
  poor = 'poor inn',
  common = 'common inn',
  good = 'good inn',
}

enum patrons {
  townsfolk = 'townsfolk',
  adventurers = 'adventurers',
}

enum locations {
  village = 'village',
  town = 'town',
  capital = 'capital town',
  wilderness = 'wilderness',
}

enum threat {
  none = 'none',
  low = 'low',
  moderate = 'moderate',
  great = 'great',
}

enum races {
  human = 'human',
  woodElf = 'wooden elf',
  dwarf = 'dwarf',
  halfling = 'halfling',
  gnome = 'gnome',
}

export class CreateGossipDTO {
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
