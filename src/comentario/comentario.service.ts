import { Injectable } from '@nestjs/common';
import { Prisma, PrismaClient } from '../../generated/prisma';

@Injectable()
export class ComentarioService {
  private prisma = new PrismaClient();

  async create(data: Prisma.ComentarioCreateInput) {
    return this.prisma.comentario.create({ data });
  }

  async findAll() {
    return this.prisma.comentario.findMany();
  }

  async findOne(id: number) {
    return this.prisma.comentario.findUnique({ where: { id } });
  }

  async update(id: number, data: Prisma.ComentarioUpdateInput) {
    return this.prisma.comentario.update({
      where: { id },
      data,
    });
  }

  async remove(id: number) {
    return this.prisma.comentario.delete({ where: { id } });
  }
}