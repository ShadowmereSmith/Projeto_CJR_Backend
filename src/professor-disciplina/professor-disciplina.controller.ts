import { Controller, Get, Post, Body, Param, Delete, Put } from '@nestjs/common';
import { ProfessorDisciplinaService } from './professor-disciplina.service';
import { CreateProfessorDisciplinaDto } from './dto/create-professor-disciplina.dto';
import { UpdateProfessorDisciplinaDto } from './dto/update-professor-disciplina.dto';

@Controller('professores-disciplinas')
export class ProfessorDisciplinaController {
  constructor(private readonly professorDisciplinaService: ProfessorDisciplinaService) {}

  @Post()
  create(@Body() data: CreateProfessorDisciplinaDto) {
    return this.professorDisciplinaService.create(data);
  }

  @Get()
  findAll() {
    return this.professorDisciplinaService.findAll();
  }

  @Get(':professorID/:disciplinaID')
  findOne(
    @Param('professorID') professorID: string,
    @Param('disciplinaID') disciplinaID: string
  ) {
    return this.professorDisciplinaService.findOne(+professorID, +disciplinaID);
  }

  @Put(':id')
  update(
    @Param('professorID') professorID: string,
    @Param('disciplinaID') disciplinaID: string,
    @Body() data: UpdateProfessorDisciplinaDto
) {
    return this.professorDisciplinaService.update(+professorID, +disciplinaID, data);
  }

  @Delete(':id')
  remove(
    @Param('professorID') professorID: string,
    @Param('disciplinaID') disciplinaID: string
) {
    return this.professorDisciplinaService.remove(+professorID, +disciplinaID);
  }
}