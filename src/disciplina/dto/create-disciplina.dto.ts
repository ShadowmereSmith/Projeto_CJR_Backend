import {
  IsNotEmpty,
  IsString,
} from 'class-validator';

export class CreateDisciplinaDto {

  @IsNotEmpty({ message: 'Nome é obrigatório' })
  @IsString({ message: 'Nome precisa ser uma string' })
  nome: string;

}