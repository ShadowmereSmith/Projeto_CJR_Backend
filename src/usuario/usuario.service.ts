import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class UsuarioService {
  private prisma = new PrismaClient();

  async create(data: CreateUsuarioDto) {
    const existente = await this.prisma.usuario.findUnique({
      where: { email: data.email },
    })

  if (existente) {
    throw new BadRequestException('Já existe um usuário com este email.');
  }

    const senhaCriptografada = bcrypt.hashSync(data.senha, 10);

    return this.prisma.usuario.create({
      data: {
        ...data,
        senha: senhaCriptografada,
      },
    });
  }

  async findAll() {
    return this.prisma.usuario.findMany();
  }

  async findOne(id: number) {

    //Verificando se o usuario existe
    const usuario = await this.prisma.usuario.findUnique({ where: { id } });
    if (!usuario) {
      throw new NotFoundException('Usuário não encontrado.');
    }

    return usuario;
  }

  async update(id: number, data: UpdateUsuarioDto) {

    //Verificando se o usuario existe
    const usuario = await this.prisma.usuario.findUnique({ where: { id } });
    if (!usuario) {
      throw new NotFoundException('Usuário não encontrado.');
    }
    
    //Se estiver tentando alterar o email, verificar se ele já está em uso
    if (data.email && data.email !== usuario.email) {
      const emailExistente = await this.prisma.usuario.findUnique({
        where: { email: data.email },
      });
      if (emailExistente) {
        throw new BadRequestException('Este email já está em uso por outro usuário.');
      }
    }

    return this.prisma.usuario.update({
      where: { id },
      data,
    });
  }

  async remove(id: number) {

    //Verificando se o usuario existe
    const usuario = await this.prisma.usuario.findUnique({ where: { id } });
    if (!usuario) {
      throw new NotFoundException('Usuário não encontrado.');
    }
    
    return this.prisma.usuario.delete({ where: { id } });
  }
}
