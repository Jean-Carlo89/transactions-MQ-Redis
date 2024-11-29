import { Test, TestingModule } from '@nestjs/testing';
import { RechargeController } from './recharge.controller';
import { RechargeService } from './recharge.service';

describe('RechargeController', () => {
  let controller: RechargeController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RechargeController],
      providers: [RechargeService],
    }).compile();

    controller = module.get<RechargeController>(RechargeController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
