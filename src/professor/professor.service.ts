import { Injectable } from '@nestjs/common';
import { Prisma, PrismaClient } from '../../generated/prisma';

@Injectable()
export class ProfessorService {
  private prisma = new PrismaClient();

  async create(data: Prisma.ProfessorCreateInput) {
    return this.prisma.professor.create({ data });
  }

  async findAll() {
    return this.prisma.professor.findMany();
  }

  async findOne(id: number) {
    return this.prisma.professor.findUnique({ where: { id } });
  }

  async update(id: number, data: Prisma.ProfessorUpdateInput) {
    return this.prisma.professor.update({
      where: { id },
      data,
    });
  }

  async remove(id: number) {
    return this.prisma.professor.delete({ where: { id } });
  }
}