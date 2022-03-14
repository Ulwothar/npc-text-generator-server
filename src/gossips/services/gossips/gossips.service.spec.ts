import { Test, TestingModule } from '@nestjs/testing';
import { GossipsService } from './gossips.service';

describe('GossipsService', () => {
  let service: GossipsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GossipsService],
    }).compile();

    service = module.get<GossipsService>(GossipsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
