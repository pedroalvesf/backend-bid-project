import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../../prisma.service'; // Importe o PrismaService
import { UsersController } from '../../users/users.controller';
import { UsersService } from '../../users/users.service';
import { mockUsers } from './mock.users.controller';

describe('UsersController', () => {
  let controller: UsersController;
  let service: UsersService;
  let prismaService: PrismaService;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [UsersService, PrismaService],
    }).compile();

    controller = module.get<UsersController>(UsersController);
    service = module.get<UsersService>(UsersService);
    prismaService = module.get<PrismaService>(PrismaService);
  });

  describe('findAll', () => {
    it('should return an array of users', async () => {
      jest.spyOn(service, 'findAll').mockResolvedValue(mockUsers);

      const result = await controller.findAll();

      expect(result).toEqual(mockUsers);
    });
  });

  describe('findOne', () => {
    it('should return a user', async () => {
      const mockUser = mockUsers[0];

      jest.spyOn(service, 'findOne').mockResolvedValue(mockUser);

      const result = await controller.findOne('1');

      expect(result).toEqual(mockUser);
    });

    it('should throw an error if user not found', async () => {
      jest.spyOn(service, 'findOne').mockRejectedValue(new NotFoundException('User not found'));
      await expect(async () => {
        await controller.findOne('100');
      }).rejects.toThrow(NotFoundException);
    });
  });

  describe('create', () => {
    it('should create a user', async () => {
      const mockUser = mockUsers[0];

      jest.spyOn(service, 'create').mockResolvedValue(mockUser);

      const result = await controller.create(mockUser);

      expect(result).toEqual(mockUser);
    });

    it('should throw an error if user already exists', async () => {
      const mockUser = mockUsers[0];

      jest.spyOn(service, 'create').mockRejectedValue(new Error('User already exists'));
      await expect(async () => {
        await controller.create(mockUser);
      }).rejects.toThrow(Error);
    });
  });

  describe('update', () => {
    it('should update a user', async () => {
      const mockUser = mockUsers[0];

      jest.spyOn(service, 'update').mockResolvedValue(mockUser);

      const result = await controller.update('1', mockUser);

      expect(result).toEqual(mockUser);
    });

    it('should throw an error if user not found', async () => {
      const mockUser = mockUsers[0];

      jest.spyOn(service, 'update').mockRejectedValue(new NotFoundException('User not found'));
      await expect(async () => {
        await controller.update('100', mockUser);
      }).rejects.toThrow(NotFoundException);
    });
  });

  describe('remove', () => {
    it('should remove a user', async () => {
      const mockUser = mockUsers[0];

      jest.spyOn(service, 'remove').mockResolvedValue(mockUser);

      const result = await controller.remove('1');

      expect(result).toEqual(mockUser);
    });

    it('should throw an error if user not found', async () => {
      jest.spyOn(service, 'remove').mockRejectedValue(new NotFoundException('User not found'));
      await expect(async () => {
        await controller.remove('100');
      }).rejects.toThrow(NotFoundException);
    });
  });

  afterAll(async () => {
    await prismaService.$disconnect();
  });
});
