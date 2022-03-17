import { Document } from 'mongoose';
export enum types {
  poor = 'poor inn',
  common = 'common inn',
  good = 'good inn',
}

export enum patrons {
  townsfolk = 'townsfolk',
  adventurers = 'adventurers',
}

export enum locations {
  village = 'village',
  town = 'town',
  capital = 'capital town',
  wilderness = 'wilderness',
}

export enum threat {
  none = 'none',
  low = 'low',
  moderate = 'moderate',
  great = 'great',
}

export enum races {
  human = 'human',
  woodElf = 'wooden elf',
  dwarf = 'dwarf',
  halfling = 'halfling',
  gnome = 'gnome',
}

export interface Gossip extends Document {
  readonly type: types;
  readonly patrons: patrons;
  readonly threat: threat;
}
