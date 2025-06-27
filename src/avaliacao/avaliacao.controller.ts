import { Controller, Get, Post, Body, Param, Delete, Put } from '@nestjs/common';
import { AvaliacaoService } from './avaliacao.service';
import { CreateAvaliacaoDto } from './dto/create-avaliacao.dto';
import { UpdateAvaliacaoDto } from './dto/update-avaliacao.dto';

@Controller('avaliacoes')
export class AvaliacaoController {
  constructor(private readonly avaliacaoService: AvaliacaoService) {}

  @Post()
  create(@Body() data: CreateAvaliacaoDto) {
    return this.avaliacaoService.create(data);
  }

  @Get()
  findAll() {
    return this.avaliacaoService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.avaliacaoService.findOne(+id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() data: UpdateAvaliacaoDto) {
    return this.avaliacaoService.update(+id, data);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.avaliacaoService.remove(+id);
  }
}