import { Test, TestingModule } from '@nestjs/testing';
import { PrefixesService } from './prefixes.service';

describe('PrefixesService', () => {
  let service: PrefixesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PrefixesService],
    }).compile();

    service = module.get<PrefixesService>(PrefixesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
