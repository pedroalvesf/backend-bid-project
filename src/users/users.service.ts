import { Injectable, NotFoundException } from '@nestjs/common';
import { User } from '@prisma/client';
import { PrismaService } from '../prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import * as bcrypt from 'bcrypt';
import { bcryptSalt } from 'src/auth/constants';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    createUserDto.password = await bcrypt.hash(
      createUserDto.password,
      bcryptSalt,
    );

    const user = await this.prisma.user.create({
      data: createUserDto,
    });
    return user;
  }

  async findAll(): Promise<User[]> {
    return this.prisma.user.findMany();
  }

  async findOneById(id: number): Promise<User | null> {
    const user = await this.prisma.user.findUnique({
      where: { id },
    });

    if (!user) {
      throw new NotFoundException(`User with id ${id} not found`);
    }

    return user;
  }

  async findOne(query: {
    email?: string;
    username?: string;
  }): Promise<User | null> {
    const user = await this.prisma.user.findUnique({
      where: { email: query.email, username: query.username },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    await this.findOneById(id);

    const { username, password, email, name, role } = updateUserDto;

    return this.prisma.user.update({
      where: { id },
      data: {
        username,
        password,
        email,
        name,
        role,
      },
    });
  }

  async remove(id: number): Promise<User> {
    await this.findOneById(id);

    return this.prisma.user.delete({
      where: { id },
    });
  }
}
