import { 
  Controller, 
  Get, 
  Post, 
  Body, 
  Param, 
  Delete, 
  Put, 
  UseGuards, 
  Req, 
  ForbiddenException 
} from '@nestjs/common';
import { ComentarioService } from './comentario.service';
import { CreateComentarioDto } from './dto/create-comentario.dto';
import { UpdateComentarioDto } from './dto/update-comentario.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('comentarios')
export class ComentarioController {
  constructor(private readonly comentarioService: ComentarioService) {}

  @Post()
  create(@Body() data: CreateComentarioDto) {
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
  update(@Param('id') id: string, @Body() data: UpdateComentarioDto) {
    return this.comentarioService.update(+id, data);
  }

  // PROTEGE O DELETE: só o dono do comentário pode excluir
  @UseGuards(AuthGuard('jwt'))
  @Delete(':id')
  async remove(@Param('id') id: string, @Req() req) {
    const userId = req.user.userId || req.user.sub; // depende do seu payload
    const comentario = await this.comentarioService.findOne(+id);

    if (!comentario) throw new ForbiddenException('Comentário não encontrado.');
    if (comentario.usuarioID !== userId) throw new ForbiddenException('Você só pode excluir seus próprios comentários.');

    return this.comentarioService.remove(+id);
  }
}
