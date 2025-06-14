import { Injectable } from '@nestjs/common';
import { Prisma, PrismaClient } from '../../generated/prisma';

@Injectable()
export class AvaliacaoService {
  private prisma = new PrismaClient();

  async create(data: Prisma.AvaliacaoCreateInput) {
    return this.prisma.avaliacao.create({ data });
  }

  async findAll() {
    return this.prisma.avaliacao.findMany();
  }

  async findOne(id: number) {
    return this.prisma.avaliacao.findUnique({ where: { id } });
  }

  async update(id: number, data: Prisma.AvaliacaoUpdateInput) {
    return this.prisma.avaliacao.update({
      where: { id },
      data,
    });
  }

  async remove(id: number) {
    return this.prisma.avaliacao.delete({ where: { id } });
  }
}