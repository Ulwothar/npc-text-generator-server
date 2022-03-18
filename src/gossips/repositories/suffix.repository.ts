import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Suffix, SuffixDocument } from '../schemas/Suffix.schema';
import { Model, FilterQuery } from 'mongoose';

@Injectable()
export class SuffixRepository {
  constructor(
    @InjectModel(Suffix.name)
    private suffixModel: Model<SuffixDocument>,
  ) {}

  async findOne(useFilterQuery: FilterQuery<Suffix>): Promise<Suffix> {
    return this.suffixModel.findOne(useFilterQuery);
  }

  async find(useFilterQuery: FilterQuery<Suffix>): Promise<Suffix[]> {
    return this.suffixModel.find(useFilterQuery);
  }

  async findAll(): Promise<Suffix[]> {
    return this.suffixModel.find();
  }

  async create(suffix: Suffix): Promise<Suffix> {
    const newSuffix = new this.suffixModel(suffix);
    return newSuffix.save();
  }
}
