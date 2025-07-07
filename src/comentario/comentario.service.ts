import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaClient } from '../../generated/prisma';
import { CreateComentarioDto } from './dto/create-comentario.dto';
import { UpdateComentarioDto } from './dto/update-comentario.dto';

@Injectable()
export class ComentarioService {
  private prisma = new PrismaClient();

  async create(data: CreateComentarioDto) {
    return this.prisma.comentario.create({ data });
  }

  async findAll() {
    return this.prisma.comentario.findMany();
  }

  async findOne(id: number) {
    //Verificando se o comentario existe
    const comentario = await this.prisma.comentario.findUnique({ 
      where: { id },
      include: {
        usuario: true,
        avaliacao: true,
      }
    });
    if (!comentario) {
      throw new NotFoundException('Comentário não encontrado.');
    }
    
    return comentario;
  }

  async update(id: number, data: UpdateComentarioDto) {

    //Verificando se o comentario existe
    const comentario = await this.prisma.comentario.findUnique({ where: { id } });
    if (!comentario) {
      throw new NotFoundException('Comentário não encontrado.');
    }

    return this.prisma.comentario.update({
      where: { id },
      data,
    });
  }

  async remove(id: number) {

    //Verificando se o comentario existe
    const comentario = await this.prisma.comentario.findUnique({ where: { id } });
    if (!comentario) {
      throw new NotFoundException('Comentário não encontrado.');
    }

    return this.prisma.comentario.delete({ where: { id } });
  }
}