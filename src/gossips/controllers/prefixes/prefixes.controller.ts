import {
  Body,
  Controller,
  HttpException,
  HttpStatus,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CreatePrefixDTO } from 'src/gossips/dtos/create-prefix.dto';
import { Prefix } from 'src/gossips/schemas/prefix.schema';
import { PrefixesService } from 'src/gossips/services/prefixes/prefixes.service';

@Controller('prefixes')
export class PrefixesController {
  constructor(private readonly prefixesService: PrefixesService) {}

  @UsePipes(ValidationPipe)
  @Post()
  async createPrefix(@Body() prefix: CreatePrefixDTO): Promise<Prefix> {
    const newPrefix = await this.prefixesService.createPrefix(prefix);
    if (!newPrefix) {
      throw new HttpException(
        'Prefix could not be created',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
    return newPrefix;
  }
}
