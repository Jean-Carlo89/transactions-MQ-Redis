import { BullQueueServiceService } from './../bull-queue-service/bull-queue-service.service';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Recharge } from '../db/entitites/Recharge.entity';
import { RechargeController } from './recharge.controller';
import { RechargeService } from './recharge.service';

describe('RechargeController', () => {
  let controller: RechargeController;
  const mockRechargeRepository = {
    create: jest.fn(),
    save: jest.fn(),
    find: jest.fn(),
    update: jest.fn(),
  };

  //**** adding mocks for Nest complains about the lack of module in root test module */
  const mockBullQueue = {
    add: jest.fn(),
    process: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RechargeController],
      providers: [
        RechargeService,
        BullQueueServiceService,
        {
          provide: getRepositoryToken(Recharge),
          useValue: mockRechargeRepository,
        },
        {
          provide: 'BullQueue_recharges',
          useValue: mockBullQueue,
        },
      ],
    }).compile();

    controller = module.get<RechargeController>(RechargeController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
