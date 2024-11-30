import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
// import { Recharge, RechargeStatus } from 'src/db/entitites/Recharge.entity';
import { Recharge, RechargeStatus } from '../db/entitites/Recharge.entity';
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
    if (!userId) {
      throw new HttpException('User Id is invalid', 400);
    }

    if (!phoneNumber) {
      throw new HttpException('phone number is invalid', 400);
    }
    // const recharge = await this.rechargeRepository.findOne({
    //   where: { user_id: userId, phone_number: phoneNumber },
    // });
    // const response = { recarga_id: recharge.id, ...recharge };
    // delete response.id;
    // return response;

    //**** Adding this for same user with same phone number making many recharges */

    console.log(userId);

    console.log(phoneNumber);
    const recharges = await this.rechargeRepository.find({
      where: { user_id: userId, phone_number: phoneNumber },
    });

    return recharges.map((recharge) => {
      const { id, ...rest } = recharge;
      return { recarga_id: id, ...rest };
    });
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
