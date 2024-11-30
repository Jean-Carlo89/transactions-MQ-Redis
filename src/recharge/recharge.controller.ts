import { BullQueueServiceService } from './../bull-queue-service/bull-queue-service.service';
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { RechargeService } from './recharge.service';
import { CreateRechargeDto } from './dto/create-recharge.dto';

@Controller('recharge')
export class RechargeController {
  constructor(
    private readonly rechargeService: RechargeService,
    private readonly queueService: BullQueueServiceService,
  ) {}

  @Post()
  async create(@Body() createRechargeDto: CreateRechargeDto) {
    const recharge = await this.rechargeService.create(createRechargeDto);

    await this.queueService.addRechargeToQueue(recharge.recarga_id);

    return recharge;
  }

  @Get()
  findAll() {
    return this.rechargeService.findAll();
  }

  @Get('status')
  async findOneByUserAdnPhone(
    @Query('userId') userId: string,
    @Query('phoneNumber') phoneNumber: string,
  ) {
    return this.rechargeService.findRechargeByUserAndPhone(userId, phoneNumber);
  }

  // @Patch(':id')
  // update(
  //   @Param('id') id: string,
  //   @Body() updateRechargeDto: UpdateRechargeDto,
  // ) {
  //   return this.rechargeService.update(+id, updateRechargeDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.rechargeService.remove(+id);
  // }
}
