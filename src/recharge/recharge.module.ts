import { BullQueueServiceService } from './../bull-queue-service/bull-queue-service.service';
import { Module } from '@nestjs/common';
import { RechargeService } from './recharge.service';
import { RechargeController } from './recharge.controller';
import { Recharge } from 'src/db/entitites/Recharge.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BullModule } from '@nestjs/bull';
import { RechargeProcessor } from 'src/bull-queue-service/bullProcessor';

@Module({
  imports: [
    TypeOrmModule.forFeature([Recharge]),
    BullModule.registerQueue({
      name: 'recharges',
    }),
  ],
  controllers: [RechargeController],
  providers: [RechargeService, BullQueueServiceService, RechargeProcessor],
})
export class RechargeModule {}
