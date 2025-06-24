import { Controller, Get, Post, Body, Param, Delete, Put } from '@nestjs/common';
import { ProfessorService } from './professor.service';
import { Prisma } from '../../generated/prisma';

@Controller('professores')
export class ProfessorController {
  constructor(private readonly professorService: ProfessorService) {}

  @Post()
  create(@Body() data: Prisma.ProfessorCreateInput) {
    return this.professorService.create(data);
  }

  @Get()
  findAll() {
    return this.professorService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.professorService.findOne(+id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() data: Prisma.ProfessorUpdateInput) {
    return this.professorService.update(+id, data);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.professorService.remove(+id);
  }
}