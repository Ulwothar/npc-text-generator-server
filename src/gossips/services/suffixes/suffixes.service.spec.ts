import { Test, TestingModule } from '@nestjs/testing';
import { SuffixesService } from './suffixes.service';

describe('SuffixesService', () => {
  let service: SuffixesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SuffixesService],
    }).compile();

    service = module.get<SuffixesService>(SuffixesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
