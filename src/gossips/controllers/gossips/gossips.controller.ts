import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Post,
  Query,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CreateGossipDTO } from 'src/gossips/dtos/create-gossip.dto';
import { SearchGossipDTO } from 'src/gossips/dtos/search-gossip.dto';
import { Gossip } from 'src/gossips/schemas/gossip.schema';
import { GossipsService } from 'src/gossips/services/gossips/gossips.service';

@Controller('gossips')
export class GossipsController {
  constructor(private readonly gossipsService: GossipsService) {}

  @UsePipes(ValidationPipe)
  @Get('all')
  async getAllGossips() {
    const gossips = await this.gossipsService.getGossips();
    if (!gossips) {
      throw new HttpException(
        'There are no gossips today',
        HttpStatus.BAD_REQUEST,
      );
    }
    return gossips;
  }

  @UsePipes(ValidationPipe)
  @Get('')
  async getGossipsByQuery(@Query() query: SearchGossipDTO) {
    console.log(query);
    const gossip = await this.gossipsService.getGossipsByQuery(query);
    if (!gossip || gossip.rumors.length === 0) {
      throw new HttpException(
        'I do not have any gossips for you today',
        HttpStatus.NOT_FOUND,
      );
    }

    return gossip;
  }

  @UsePipes(ValidationPipe)
  @Post('create')
  async createGossip(@Body() gossip: CreateGossipDTO): Promise<Gossip | null> {
    const newGossip = await this.gossipsService.createGossip(gossip);
    if (!newGossip) {
      throw new HttpException(
        'Gossip was not created, please try again',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
    return newGossip;
  }
}
