import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaClient } from '../../generated/prisma';
import { CreateDisciplinaDto } from './dto/create-disciplina.dto';
import { UpdateDisciplinaDto } from './dto/update-disciplina.dto';

@Injectable()
export class DisciplinaService {
  private prisma = new PrismaClient();

  async create(data: CreateDisciplinaDto) {
    return this.prisma.disciplina.create({ data });
  }

  async findAll() {
    return this.prisma.disciplina.findMany();
  }

  async findOne(id: number) {

    //Verificando se a disciplina existe
    const disciplina = await this.prisma.comentario.findUnique({
      where: { id },
      });
    if (!disciplina) {
      throw new NotFoundException('Disciplina não encontrada.');
    }
    
    return disciplina;
  }

  async update(id: number, data: UpdateDisciplinaDto) {

    //Verificando se a disciplina existe
    const disciplina = await this.prisma.comentario.findUnique({ where: { id } });
    if (!disciplina) {
      throw new NotFoundException('Disciplina não encontrada.');
    }

    return this.prisma.disciplina.update({
      where: { id },
      data,
    });
  }

  async remove(id: number) {

    //Verificando se a disciplina existe
    const disciplina = await this.prisma.comentario.findUnique({ where: { id } });
    if (!disciplina) {
      throw new NotFoundException('Disciplina não encontrada.');
    }

    return this.prisma.disciplina.delete({ where: { id } });
  }
}