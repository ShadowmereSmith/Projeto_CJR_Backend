import { Controller, Get, Post, Body, Param, Delete, Put } from '@nestjs/common';
import { DisciplinaService } from './disciplina.service';
import { Prisma } from '../../generated/prisma';

@Controller('disciplinas')
export class DisciplinaController {
  constructor(private readonly disciplinaService: DisciplinaService) {}

  @Post()
  create(@Body() data: Prisma.DisciplinaCreateInput) {
    return this.disciplinaService.create(data);
  }

  @Get()
  findAll() {
    return this.disciplinaService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.disciplinaService.findOne(+id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() data: Prisma.DisciplinaUpdateInput) {
    return this.disciplinaService.update(+id, data);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.disciplinaService.remove(+id);
  }
}