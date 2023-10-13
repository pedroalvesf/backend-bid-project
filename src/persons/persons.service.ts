import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreatePersonDto } from './dto/create-person.dto';
import { UpdatePersonDto } from './dto/update-person.dto';

@Injectable()
export class PersonsService {
  constructor(private prisma: PrismaService) {}
  async create(createPersonDto: CreatePersonDto) {
    const user = await this.prisma.user.findUnique({
      where: { id: createPersonDto.userId },
    });
    if (!user) {
      throw new NotFoundException(`User with id ${createPersonDto.userId} not found`);
    }
    const alreadyInUse = await this.prisma.person.findUnique({
      where: { userId: createPersonDto.userId },
    });
    if (alreadyInUse) {
      throw new ConflictException(`Person with user id ${createPersonDto.userId} already exists`);
    }
    return this.prisma.person.create({
      data: createPersonDto,
    })
  };

  async findAll() {
    return this.prisma.person.findMany();
  }

  async findOne(id: number) {
    const person = await this.prisma.person.findUnique({
      where: { id },
    });
    if (!person) {
      throw new NotFoundException(`Person with id ${id} not found`);
    }
    return person;
  }

  update(id: number, updatePersonDto: UpdatePersonDto) {
    return this.prisma.person.update({
      where: { id },
      data: updatePersonDto,
      });
  }

  remove(id: number) {
    const person = this.prisma.person.findUnique({
      where: { id },
    });

    if (!person) {
      throw new NotFoundException(`Person with id ${id} not found`);
    }
    
    return this.prisma.person.delete({
      where: { id },
      });
  }
}
