import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('recharges')
export class Recharge {
  @PrimaryGeneratedColumn('increment')
  id: string;

  @Column()
  user_id: string;

  @Column()
  phone_number: string;

  @Column()
  status: RechargeStatus;

  @Column('decimal', { precision: 10, scale: 2 })
  amount: number;

  @UpdateDateColumn({ type: 'timestamp' })
  updated_at: Date;

  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date;
}

export enum RechargeStatus {
  SUCCESSFUL = 'OK',
  FAILED = 'FAILED',
  PENDING = 'PENDING',
}
