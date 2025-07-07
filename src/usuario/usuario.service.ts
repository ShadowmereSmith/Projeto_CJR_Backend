import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaClient } from '../../generated/prisma';
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

    // Checar se quer trocar senha
    if (data.senhaAtual || data.novaSenha) {
      if (!data.senhaAtual || !data.novaSenha) {
        throw new BadRequestException('Para trocar a senha, envie senhaAtual e novaSenha.');
      }

      // Validar senha atual
      const senhaCorreta = await bcrypt.compare(data.senhaAtual, usuario.senha);
      if (!senhaCorreta) {
        throw new BadRequestException('Senha atual incorreta.');
      }

      // Gerar novo hash
      const novoHash = await bcrypt.hash(data.novaSenha, 10);

      // Atualizar o hash no objeto de update
      data.senha = novoHash;

      // Remover campos não salvos na tabela
      delete data.senhaAtual;
      delete data.novaSenha;
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
