import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateRechargeDto } from './dto/create-recharge.dto';
import { UpdateRechargeDto } from './dto/update-recharge.dto';
import { Recharge } from './entities/recharge.entity';

@Injectable()
export class RechargeService {
  constructor(
    @InjectRepository(Recharge)
    private readonly rechargeRepository: Repository<Recharge>,
  ) {}

  create(createRechargeDto: CreateRechargeDto) {
    return 'This action adds a new recharge';
  }

  findAll() {
    return `This action returns all recharge`;
  }

  findOne(id: number) {
    return `This action returns a #${id} recharge`;
  }

  update(id: number, updateRechargeDto: UpdateRechargeDto) {
    return `This action updates a #${id} recharge`;
  }

  remove(id: number) {
    return `This action removes a #${id} recharge`;
  }
}
