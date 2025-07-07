import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaClient } from '../../generated/prisma';
import { CreateProfessorDto } from './dto/create-professor.dto';
import { UpdateProfessorDto } from './dto/update-professor.dto';

@Injectable()
export class ProfessorService {
  private prisma = new PrismaClient();

  async create(data: CreateProfessorDto) {
    return this.prisma.professor.create({ data });
  }

  async findAll() {
    return this.prisma.professor.findMany();
  }

  async findOne(id: number) {

    //Verificando se o professor existe
    const professor = await this.prisma.professor.findUnique({ 
      where: { id },
      include: {
        avaliacoes: true,
        disciplinas: true,
      }
    });
    if (!professor) {
      throw new NotFoundException('Professor não encontrado.');
    }

    return professor;
  }

  async update(id: number, data: UpdateProfessorDto) {

    //Verificando se o professor existe
    const professor = await this.prisma.professor.findUnique({ where: { id } });
    if (!professor) {
      throw new NotFoundException('Professor não encontrado.');
    }

    return this.prisma.professor.update({
      where: { id },
      data,
    });
  }

  async remove(id: number) {

    //Verificando se o professor existe
    const professor = await this.prisma.professor.findUnique({ where: { id } });
    if (!professor) {
      throw new NotFoundException('Professor não encontrado.');
    }

    return this.prisma.professor.delete({ where: { id } });
  }
}