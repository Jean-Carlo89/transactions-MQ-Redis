import { Module } from '@nestjs/common';
import { RechargeService } from './recharge.service';
import { RechargeController } from './recharge.controller';
import { Recharge } from 'src/db/entitites/Recharge.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Recharge])],
  controllers: [RechargeController],
  providers: [RechargeService],
})
export class RechargeModule {}
