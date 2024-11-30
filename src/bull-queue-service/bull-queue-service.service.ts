import { InjectQueue } from '@nestjs/bull';
import { Injectable } from '@nestjs/common';
import { Queue } from 'bull';

@Injectable()
export class BullQueueServiceService {
  constructor(
    @InjectQueue('recharges') private readonly rechargeQueue: Queue,
  ) {}

  addRechargeToQueue(rechargeId: string) {
    return this.rechargeQueue.add(
      'processRecharge',
      { rechargeId },
      { delay: 20000 },
    );
  }
}
