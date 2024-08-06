import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateUserDTO } from '../dtos/requests/create-user.dto';
import { UpdateUserDTO } from '../dtos/requests/update-user.dto';

@Injectable()
export class UserRepository {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateUserDTO) {
    return this.prisma.user.create({
      data: dto,
    });
  }

  async getById(id: string) {
    return this.prisma.user.findFirst({
      where: {
        OR: [{ id }, { providerId: id }],
      },
    });
  }

  async getByEmail(email: string) {
    return this.prisma.user.findFirst({
      where: { email },
    });
  }

  async getAll() {
    return this.prisma.user.findMany({
      orderBy: [{ name: 'asc' }, { active: 'desc' }],
    });
  }

  async updateUser(id: string, dto: UpdateUserDTO) {
    return this.prisma.user.update({
      where: { id },
      data: dto,
    });
  }
}
