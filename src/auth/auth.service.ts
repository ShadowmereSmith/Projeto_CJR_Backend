import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';
import { jwtConstants } from './constants';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService) {}

  async login(email: string, senha: string) {
    const usuario = await this.prisma.usuario.findUnique({ where: { email } });

    if (!usuario || !bcrypt.compareSync(senha, usuario.senha)) {
      throw new UnauthorizedException('Credenciais inválidas');
    }

    const payload = { sub: usuario.id };

    const token = jwt.sign(payload, jwtConstants.secret, { expiresIn: '1h' });

    return { token };
  }

  async register(email: string, senha: string, nome: string, curso: string, departamento: string) {
    const existe = await this.prisma.usuario.findUnique({ where: { email } });

    if (existe) {
      throw new UnauthorizedException('Usuário já cadastrado');
    }

    const senhaHash = bcrypt.hashSync(senha, 10);

    const novoUsuario = await this.prisma.usuario.create({
      data: {
        email,
        senha: senhaHash,
        nome: nome,
        curso: curso,
        departamento: departamento,
      },
    });

    return {
      id: novoUsuario.id,
      email: novoUsuario.email,
    };
  }
}
