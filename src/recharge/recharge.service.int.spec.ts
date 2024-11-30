import { getRepositoryToken } from '@nestjs/typeorm';
import { Test, TestingModule } from '@nestjs/testing';
import { RechargeService } from './recharge.service';
import { Repository } from 'typeorm';
import { Recharge, RechargeStatus } from '../db/entitites/Recharge.entity';
import { time } from 'console';

class MockRechargeRepository {
  mockdb: Recharge[] = [];

  create(recharge: Partial<Recharge>) {
    const newRecharge = {
      id: (this.mockdb.length + 1).toString(),
      ...recharge,
      created_at: new Date(Date.now()),
      updated_at: new Date(Date.now()),
    } as Recharge;
    this.mockdb.push(newRecharge);
    return newRecharge;
  }

  async save(recharge: Recharge) {
    return recharge;
  }

  async find(query: { where: Partial<Recharge> }) {
    const { user_id, phone_number } = query.where;
    return this.mockdb.filter(
      (recharge) =>
        recharge.user_id === user_id && recharge.phone_number === phone_number,
    );
  }

  async update(id: string, updateFields: Partial<Recharge>) {
    console.log('Called correctly');
    const index = this.mockdb.findIndex((recharge) => recharge.id === id);
    if (index > -1) {
      this.mockdb[index] = { ...this.mockdb[index], ...updateFields };
      return true;
    }
    return false;
  }
}

describe('Integration tests RechargeService ', () => {
  let service: RechargeService;
  let repository: MockRechargeRepository;

  beforeEach(async () => {
    repository = new MockRechargeRepository();

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        RechargeService,
        {
          provide: getRepositoryToken(Recharge),
          useValue: repository,
        },
      ],
    }).compile();

    service = module.get<RechargeService>(RechargeService);
  });

  describe('create', () => {
    it('should create a recharge', async () => {
      const dto = {
        user_id: 'user1',
        phone_number: '1111111111',
        amount: 14.25,
      };
      const result = await service.create(dto);

      expect(repository.mockdb.length).toStrictEqual(1);
      expect(result).toEqual({
        recarga_id: '1',
        status: RechargeStatus.PENDING,
        message: 'Recarga criada com sucesso',
      });
    });
  });

  describe('findRechargeByUserAndPhone', () => {
    it('should return all recharges for the same user and phone number', async () => {
      repository.create({
        user_id: 'user1',
        phone_number: '1111111111',
        status: RechargeStatus.PENDING,
      });
      repository.create({
        user_id: 'user1',
        phone_number: '1111111111',
        status: RechargeStatus.COMPLETED,
      });

      repository.create({
        user_id: 'user2',
        phone_number: '1111111111',
        status: RechargeStatus.COMPLETED,
      });

      repository.create({
        user_id: 'user1',
        phone_number: '1111111112',
        status: RechargeStatus.COMPLETED,
      });

      expect(repository.mockdb.length).toStrictEqual(4);
      const result = await service.findRechargeByUserAndPhone(
        'user1',
        '1111111111',
      );

      expect(result.length).toBe(2);
    });
  });

  describe('updateRechargeStatus', () => {
    it('should update the status of a recharge', async () => {
      const recharge = repository.create({
        user_id: 'user1',
        phone_number: '1111111111',
        status: RechargeStatus.PENDING,
      });

      const result = await service.updateRechargeStatus(
        recharge.id,
        RechargeStatus.COMPLETED,
      );

      expect(result).toEqual(true);
      expect(repository.mockdb[0].status).toBe(RechargeStatus.COMPLETED);
    });
  });
});
