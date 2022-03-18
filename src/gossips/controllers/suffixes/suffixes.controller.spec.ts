import { Test, TestingModule } from '@nestjs/testing';
import { SuffixesController } from './suffixes.controller';

describe('SuffixesController', () => {
  let controller: SuffixesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SuffixesController],
    }).compile();

    controller = module.get<SuffixesController>(SuffixesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
