import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type PrefixDocument = Prefix & Document;

@Schema()
export class Prefix {
  @Prop()
  raceType: string;

  @Prop()
  prefix: string;
}

export const PrefixSchema = SchemaFactory.createForClass(Prefix);
