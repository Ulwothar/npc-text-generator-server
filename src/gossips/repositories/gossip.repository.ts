import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Gossip, GossipDocument } from '../schemas/gossip.schema';
import { Model, FilterQuery } from 'mongoose';

@Injectable()
export class GossipRepository {
  constructor(
    @InjectModel(Gossip.name)
    private gossipModel: Model<GossipDocument>,
  ) {}

  async findOne(useFilterQuery: FilterQuery<Gossip>): Promise<Gossip> {
    return this.gossipModel.findOne(useFilterQuery);
  }

  async find(useFilterQuery: FilterQuery<Gossip>): Promise<Gossip[]> {
    return this.gossipModel.find(useFilterQuery);
  }

  async findAll(): Promise<Gossip[]> {
    return this.gossipModel.find();
  }

  async create(gossip: Gossip): Promise<Gossip> {
    const newGossip = new this.gossipModel(gossip);
    return newGossip.save();
  }
}
