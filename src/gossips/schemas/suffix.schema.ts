import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type SuffixDocument = Suffix & Document;

@Schema()
export class Suffix {
  @Prop()
  type: string;

  @Prop()
  suffix: string;
}

export const SuffixSchema = SchemaFactory.createForClass(Suffix);
