import { Injectable } from '@nestjs/common';
import { Prisma, PrismaClient } from '../../generated/prisma';

@Injectable()
export class DisciplinaService {
  private prisma = new PrismaClient();

  async create(data: Prisma.DisciplinaCreateInput) {
    return this.prisma.disciplina.create({ data });
  }

  async findAll() {
    return this.prisma.disciplina.findMany();
  }

  async findOne(id: number) {
    return this.prisma.disciplina.findUnique({ where: { id } });
  }

  async update(id: number, data: Prisma.DisciplinaUpdateInput) {
    return this.prisma.disciplina.update({
      where: { id },
      data,
    });
  }

  async remove(id: number) {
    return this.prisma.disciplina.delete({ where: { id } });
  }
}