import {
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Query,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CreateGossipDTO } from 'src/gossips/dtos/create-gossip.dto';
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
  async getGossipsByQuery(@Query() query: CreateGossipDTO) {
    console.log(query);
    const gossip = await this.gossipsService.getGossipsByQuery(query);
    if (!gossip) {
      throw new HttpException(
        'I do not have any gossips for you today',
        HttpStatus.BAD_REQUEST,
      );
    }

    return gossip;
  }
}
