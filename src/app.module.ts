import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { config as dotenvConfig } from 'dotenv';
import { Recharge } from './db/entitites/Recharge.entity';
import { RechargeModule } from './recharge/recharge.module';
import { BullModule } from '@nestjs/bull';
import { BullQueueServiceService } from './bull-queue-service/bull-queue-service.service';
dotenvConfig({ path: `.env.${process.env.NODE_ENV}` });
@Module({
  imports: [
    BullModule.forRoot({
      redis: {
        host: process.env.REDIS_HOST,
        port: parseInt(process.env.REDIS_PORT),
      },
    }),
    BullModule.registerQueue({ name: 'recharges' }),
    TypeOrmModule.forRoot({
      type: 'mysql',

      host: process.env.DATABASE_HOST,
      port: parseInt(process.env.DATABASE_PORT),
      username: process.env.DATABASE_USERNAME,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_NAME,
      entities: [Recharge],
      synchronize: true,
    }),
    RechargeModule,
  ],
  providers: [BullQueueServiceService],
})
export class AppModule {}
