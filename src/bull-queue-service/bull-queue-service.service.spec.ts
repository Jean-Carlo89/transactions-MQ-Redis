import { Test, TestingModule } from '@nestjs/testing';
import { BullQueueServiceService } from './bull-queue-service.service';

describe('BullQueueServiceService', () => {
  let service: BullQueueServiceService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BullQueueServiceService],
    }).compile();

    service = module.get<BullQueueServiceService>(BullQueueServiceService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
