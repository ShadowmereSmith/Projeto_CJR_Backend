import { Injectable } from '@nestjs/common';
import { Prisma, PrismaClient } from '../../generated/prisma';

@Injectable()
export class UsuarioService {
  private prisma = new PrismaClient();

  async create(data: Prisma.UsuarioCreateInput) {
    return this.prisma.usuario.create({ data });
  }

  async findAll() {
    return this.prisma.usuario.findMany();
  }

  async findOne(id: number) {
    return this.prisma.usuario.findUnique({ where: { id } });
  }

  async update(id: number, data: Prisma.UsuarioUpdateInput) {
    return this.prisma.usuario.update({
      where: { id },
      data,
    });
  }

  async remove(id: number) {
    return this.prisma.usuario.delete({ where: { id } });
  }
}
