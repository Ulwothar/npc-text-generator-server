import { Test, TestingModule } from '@nestjs/testing';
import { PrefixesController } from './prefixes.controller';

describe('PrefixesController', () => {
  let controller: PrefixesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PrefixesController],
    }).compile();

    controller = module.get<PrefixesController>(PrefixesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
