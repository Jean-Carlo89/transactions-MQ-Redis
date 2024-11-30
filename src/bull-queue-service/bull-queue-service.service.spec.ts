import { Test, TestingModule } from '@nestjs/testing';
import { BullQueueServiceService } from './bull-queue-service.service';

describe('BullQueueServiceService', () => {
  let service: BullQueueServiceService;
  const mockBullQueue = {
    add: jest.fn(),
    process: jest.fn(),
  };
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BullQueueServiceService,
        {
          provide: 'BullQueue_recharges',
          useValue: mockBullQueue,
        },
      ],
    }).compile();

    service = module.get<BullQueueServiceService>(BullQueueServiceService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
