import { Test, TestingModule } from '@nestjs/testing';
import { GossipsController } from './gossips.controller';

describe('GossipsController', () => {
  let controller: GossipsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GossipsController],
    }).compile();

    controller = module.get<GossipsController>(GossipsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
