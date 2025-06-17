import { Controller, Get, Post, Body, Param, Delete, Put } from '@nestjs/common';
import { ComentarioService } from './comentario.service';
import { Prisma } from '../../generated/prisma';

@Controller('comentarios')
export class ComentarioController {
  constructor(private readonly comentarioService: ComentarioService) {}

  @Post()
  create(@Body() data: Prisma.ComentarioCreateInput) {
    return this.comentarioService.create(data);
  }

  @Get()
  findAll() {
    return this.comentarioService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.comentarioService.findOne(+id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() data: Prisma.ComentarioUpdateInput) {
    return this.comentarioService.update(+id, data);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.comentarioService.remove(+id);
  }
}