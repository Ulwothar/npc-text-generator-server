import { Controller, Get, Param } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}

@Controller('/:name')
export class NameController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getName(@Param() params): string {
    return this.appService.getName(params.name);
  }
}
