import {
  Body,
  Controller,
  HttpException,
  HttpStatus,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CreateSuffixDTO } from 'src/gossips/dtos/create-suffix.dto';
import { Suffix } from 'src/gossips/schemas/Suffix.schema';
import { SuffixesService } from 'src/gossips/services/suffixes/suffixes.service';

@Controller('suffixes')
export class SuffixesController {
  constructor(private readonly suffixesService: SuffixesService) {}

  @UsePipes(ValidationPipe)
  @Post()
  async createSuffix(@Body() suffix: CreateSuffixDTO): Promise<Suffix> {
    const newSuffix = await this.suffixesService.createSuffix(suffix);
    if (!newSuffix) {
      throw new HttpException(
        'Could not create this suffix',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
    return newSuffix;
  }
}
