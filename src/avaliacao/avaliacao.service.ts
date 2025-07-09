import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaClient } from '../../generated/prisma';
import { CreateAvaliacaoDto } from './dto/create-avaliacao.dto';
import { UpdateAvaliacaoDto } from './dto/update-avaliacao.dto';

@Injectable()
export class AvaliacaoService {
  private prisma = new PrismaClient();

  async create(data: CreateAvaliacaoDto) {
    return this.prisma.avaliacao.create({
      data: {
        conteudo: data.conteudo,
        usuario: { connect: { id: data.usuarioID } },
        professor: { connect: { id: data.professorID } },
        disciplina: { connect: { id: data.disciplinaID } },
      },
      include: {
        usuario: true,
        professor: true,
        disciplina: true,
        comentarios: true,
      },
    });
  }



  async findAll() {
    return this.prisma.avaliacao.findMany({
      include: {
        usuario: true,
        professor: true,
        disciplina: true,
        comentarios: true,
      },
    });
  }


  async findOne(id: number) {
    //Verificando se a avaliacao existe
    const avaliacao = await this.prisma.comentario.findUnique({ 
      where: { id }
    });
    if (!avaliacao) {
      throw new NotFoundException('Avaliação não encontrada.');
    }
    
    return avaliacao;
  }

  async update(id: number, data: UpdateAvaliacaoDto) {

    //Verificando se a avaliacao existe
    const avaliacao = await this.prisma.comentario.findUnique({ where: { id } });
    if (!avaliacao) {
      throw new NotFoundException('Avaliação não encontrada.');
    }

    return this.prisma.avaliacao.update({
      where: { id },
      data,
    });
  }

  async remove(id: number) {

    //Verificando se a avaliacao existe
    const avaliacao = await this.prisma.comentario.findUnique({ where: { id } });
    if (!avaliacao) {
      throw new NotFoundException('Avaliação não encontrada.');
    }

    return this.prisma.avaliacao.delete({ where: { id } });
  }
}