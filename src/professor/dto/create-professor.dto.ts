import {
  IsNotEmpty,
  IsString,
} from 'class-validator';

export class CreateProfessorDto {
  @IsNotEmpty({ message: 'Nome é obrigatório' })
  @IsString({ message: 'Nome precisa ser uma string' })
  nome: string;

  @IsNotEmpty({ message: 'Departamento é obrigatório' })
  @IsString({ message: 'Departamento precisa ser uma string' })
  departamento: string;

}