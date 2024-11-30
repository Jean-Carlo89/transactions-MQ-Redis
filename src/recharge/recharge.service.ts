import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Recharge, RechargeStatus } from 'src/db/entitites/Recharge.entity';
import { Repository } from 'typeorm';
import { CreateRechargeDto } from './dto/create-recharge.dto';
import { UpdateRechargeDto } from './dto/update-recharge.dto';

@Injectable()
export class RechargeService {
  constructor(
    @InjectRepository(Recharge)
    private readonly rechargeRepository: Repository<Recharge>,
  ) {}

  async create(createRechargeDto: CreateRechargeDto) {
    const recharge = this.rechargeRepository.create({
      ...createRechargeDto,
      status: RechargeStatus.PENDING,
    });

    const savedRecharge = await this.rechargeRepository.save(recharge);
    return {
      recarga_id: savedRecharge.id,
      status: savedRecharge.status,
      message: 'Recarga criada com sucesso',
    };
  }

  findAll() {
    return `This action returns all recharge`;
  }

  findOne(id: number) {
    return `This action returns a #${id} recharge`;
  }

  async findRechargeByUserAndPhone(userId: string, phoneNumber: string) {
    const recharge = await this.rechargeRepository.findOne({
      where: { user_id: userId, phone_number: phoneNumber },
    });
    const response = { recarga_id: recharge.id, ...recharge };
    delete response.id;
    return response;
  }

  update(id: number, updateRechargeDto: UpdateRechargeDto) {
    return `This action updates a #${id} recharge`;
  }

  updateRechargeStatus(id: string, status: RechargeStatus) {
    return this.rechargeRepository.update(id, { status });
  }

  remove(id: number) {
    return `This action removes a #${id} recharge`;
  }
}
