import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Prefix, PrefixDocument } from '../schemas/prefix.schema';
import { Model, FilterQuery } from 'mongoose';

@Injectable()
export class PrefixRepository {
  constructor(
    @InjectModel(Prefix.name)
    private prefixModel: Model<PrefixDocument>,
  ) {}

  async findOne(useFilterQuery: FilterQuery<Prefix>): Promise<Prefix> {
    return this.prefixModel.findOne(useFilterQuery);
  }

  async find(useFilterQuery: FilterQuery<Prefix>): Promise<Prefix[]> {
    return this.prefixModel.find(useFilterQuery);
  }

  async findAll(): Promise<Prefix[]> {
    return this.prefixModel.find();
  }

  async create(prefix: Prefix): Promise<Prefix> {
    const newPrefix = new this.prefixModel(prefix);
    return newPrefix.save();
  }
}
