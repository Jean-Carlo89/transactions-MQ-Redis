import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { config as dotenvConfig } from 'dotenv';
import { Recharge } from './db/entitites/Recharge.entity';
import { RechargeModule } from './recharge/recharge.module';

dotenvConfig({ path: `.env.${process.env.NODE_ENV}` });
@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'root',
      database: 'nest',
      entities: [Recharge],
      synchronize: true,
    }),
    RechargeModule,
  ],
  providers: [],
})
export class AppModule {}
