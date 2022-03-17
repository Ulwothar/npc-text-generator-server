import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type GossipDocument = Gossip & Document;

@Schema()
export class Gossip {
  @Prop()
  type: string;

  @Prop()
  patrons: string;

  @Prop()
  threat: string;

  @Prop()
  gossip: string;
}

export const GossipSchema = SchemaFactory.createForClass(Gossip);
