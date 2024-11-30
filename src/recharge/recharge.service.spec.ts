import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';

//***! Nest cant find the dependencies when relative path is used - check docs for solutions after*/
// import { Recharge, RechargeStatus } from 'src/db/entitites/Recharge.entity';
//!
import { Recharge, RechargeStatus } from '../db/entitites/Recharge.entity';
import { RechargeService } from './recharge.service';

const mockRechargeRepository = {
  create: jest.fn(),
  save: jest.fn(),
  find: jest.fn(),
  update: jest.fn(),
};

describe('RechargeService', () => {
  let service: RechargeService;

  // beforeEach(async () => {
  //   const module: TestingModule = await Test.createTestingModule({
  //     providers: [RechargeService],
  //   }).compile();

  //   service = module.get<RechargeService>(RechargeService);
  // });

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        RechargeService,
        {
          provide: getRepositoryToken(Recharge),
          useValue: mockRechargeRepository,
        },
      ],
    }).compile();

    service = module.get<RechargeService>(RechargeService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  // it('should be defined', () => {
  //   expect(service).toBeDefined();
  // });

  describe('create', () => {
    it('should create a recharge', async () => {
      const dto = {
        user_id: 'user123',
        phone_number: '123456789',
        amount: 20.02,
        status: RechargeStatus.PENDING,
      };
      const savedRecharge = {
        id: '1',
        ...dto,
      };

      mockRechargeRepository.create.mockReturnValue(savedRecharge);
      mockRechargeRepository.save.mockResolvedValue(savedRecharge);

      const result = await service.create(dto);

      expect(mockRechargeRepository.create).toHaveBeenCalledWith({
        ...dto,
        status: RechargeStatus.PENDING,
      });
      expect(mockRechargeRepository.save).toHaveBeenCalledWith(savedRecharge);
      expect(result).toEqual({
        recarga_id: '1',
        status: RechargeStatus.PENDING,
        message: 'Recarga criada com sucesso',
      });
    });
  });

  describe('findRechargeByUserAndPhone', () => {
    it('should find recharges by userId and phoneNumber', async () => {
      const recharges = [
        { id: '1', user_id: 'user123', phone_number: '123456789' },
        { id: '2', user_id: 'user123', phone_number: '123456789' },
      ];

      mockRechargeRepository.find.mockResolvedValue(recharges);

      const result = await service.findRechargeByUserAndPhone(
        'user123',
        '123456789',
      );

      expect(mockRechargeRepository.find).toHaveBeenCalledWith({
        where: { user_id: 'user123', phone_number: '123456789' },
      });
      expect(result).toEqual([
        { recarga_id: '1', user_id: 'user123', phone_number: '123456789' },
        { recarga_id: '2', user_id: 'user123', phone_number: '123456789' },
      ]);
    });

    it('should throw an error if userId is invalid', async () => {
      await expect(
        service.findRechargeByUserAndPhone('', '123456789'),
      ).rejects.toThrow('User Id is invalid');

      await expect(
        service.findRechargeByUserAndPhone(null, '123456789'),
      ).rejects.toThrow('User Id is invalid');
    });

    it('should throw an error if phoneNumber is invalid', async () => {
      await expect(
        service.findRechargeByUserAndPhone('user123', ''),
      ).rejects.toThrow('phone number is invalid');

      await expect(
        service.findRechargeByUserAndPhone('user123', undefined),
      ).rejects.toThrow('phone number is invalid');
    });
  });
});
