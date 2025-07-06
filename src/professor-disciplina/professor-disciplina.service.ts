import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaClient } from '../../generated/prisma';
import { CreateProfessorDisciplinaDto } from './dto/create-professor-disciplina.dto';
import { UpdateProfessorDisciplinaDto } from './dto/update-professor-disciplina.dto';

@Injectable()
export class ProfessorDisciplinaService {
  private prisma = new PrismaClient();

  async create(data: CreateProfessorDisciplinaDto) {
    return this.prisma.professorDisciplina.create({ data });
  }

  async findAll() {
    return this.prisma.professorDisciplina.findMany();
  }

  async findOne(professorID: number, disciplinaID: number) {

    //Verificando se o professor que leciona a disciplina existe
    const professorDisciplina = await this.prisma.professorDisciplina.findUnique({ where: { professorID_disciplinaID: { professorID, disciplinaID } }});
    if (!professorDisciplina) {
      throw new NotFoundException('ProfessorDisciplina não encontrado.');
    }

    return professorDisciplina;
  }

  async update(professorID: number, disciplinaID: number, data: UpdateProfessorDisciplinaDto) {

    //Verificando se o professor que leciona a disciplina existe
    const professorDisciplina = await this.prisma.professorDisciplina.findUnique({ where: { professorID_disciplinaID: { professorID, disciplinaID } } });
    if (!professorDisciplina) {
      throw new NotFoundException('ProfessorDisciplina não encontrado.');
    }

    return this.prisma.professorDisciplina.update({
      where: { professorID_disciplinaID: { professorID, disciplinaID } },
      data,
    });
  }

  async remove(professorID: number, disciplinaID: number) {

    //Verificando se o professor que leciona a disciplina existe
    const professorDisciplina = await this.prisma.professorDisciplina.findUnique({ where: { professorID_disciplinaID: { professorID, disciplinaID } } });
    if (!professorDisciplina) {
      throw new NotFoundException('ProfessorDisciplina não encontrado.');
    }

    return this.prisma.professorDisciplina.delete({ where: { professorID_disciplinaID: { professorID, disciplinaID } } });
  }
}