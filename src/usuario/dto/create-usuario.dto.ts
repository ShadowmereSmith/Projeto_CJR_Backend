import {
  IsBase64,
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsStrongPassword,
} from 'class-validator';

export class CreateUsuarioDto {
  @IsNotEmpty({ message: 'Nome é obrigatório' })
  @IsString({ message: 'Nome precisa ser uma string' })
  nome: string;

  @IsNotEmpty({ message: 'Email é obrigatório' })
  @IsEmail()
  email: string;

  @IsNotEmpty({ message: 'Senha é obrigatória' })
  @IsStrongPassword()
  senha: string;

  @IsNotEmpty({ message: 'Departamento é obrigatório' })
  @IsString({ message: 'Departamento precisa ser uma string' })
  departamento: string;

  @IsNotEmpty({ message: 'Curso é obrigatório' })
  @IsString({ message: 'Curso precisa ser uma string' })
  curso: string;

  @IsOptional({ message: 'Foto de perfil é opcional' })
  @IsBase64()
  fotoperfil: Buffer;
}