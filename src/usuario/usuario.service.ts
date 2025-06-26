import { Injectable } from '@nestjs/common';
import { Prisma, PrismaClient } from '../../generated/prisma';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class UsuarioService {
  private prisma = new PrismaClient();

  async create(data: Prisma.UsuarioCreateInput) {
    const senhaCriptografada = bcrypt.hashSync(data.senha, 10);

    return this.prisma.usuario.create({
      data: {
        ...data,
        senha: senhaCriptografada,
      },
    });
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
