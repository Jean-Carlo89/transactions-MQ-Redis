import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { RechargeService } from './recharge.service';
import { CreateRechargeDto } from './dto/create-recharge.dto';
import { UpdateRechargeDto } from './dto/update-recharge.dto';

@Controller('recharge')
export class RechargeController {
  constructor(private readonly rechargeService: RechargeService) {}

  @Post()
  create(@Body() createRechargeDto: CreateRechargeDto) {
    return this.rechargeService.create(createRechargeDto);
  }

  @Get()
  findAll() {
    return this.rechargeService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.rechargeService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateRechargeDto: UpdateRechargeDto) {
    return this.rechargeService.update(+id, updateRechargeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.rechargeService.remove(+id);
  }
}
