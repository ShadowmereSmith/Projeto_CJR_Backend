import { IsEmail, IsString } from 'class-validator';

export class RegisterDto {
  @IsString()
  nome: string;

  @IsEmail()
  email: string;

  @IsString()
  senha: string;

  @IsString()
  curso: string;

  @IsString()
  departamento: string;
}
