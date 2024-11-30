import { Processor, Process } from '@nestjs/bull';
import { Job } from 'bull';
import { RechargeStatus } from 'src/db/entitites/Recharge.entity';
import { RechargeService } from 'src/recharge/recharge.service';

@Processor('recharges')
export class RechargeProcessor {
  constructor(private readonly rechargeService: RechargeService) {}

  @Process('processRecharge')
  async handleRecharge(job: Job<{ rechargeId: string }>) {
    const { rechargeId } = job.data;

    const success = Math.random() > 0.5; //*** Need this to simulate some failures for the redis tests */
    const status = success ? RechargeStatus.SUCCESSFUL : RechargeStatus.FAILED;

    await this.rechargeService.updateRechargeStatus(rechargeId, status);
  }
}
