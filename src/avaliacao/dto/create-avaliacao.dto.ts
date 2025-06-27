import {
  IsNotEmpty,
  IsString,
  IsInt,
} from 'class-validator';

export class CreateAvaliacaoDto {

  @IsNotEmpty({ message: 'usuarioID é obrigatório' })
  @IsInt({ message: 'usuarioID precisa ser um número inteiro' })
  usuarioID: number;

  @IsNotEmpty({ message: 'professorID é obrigatório' })
  @IsInt({ message: 'professorID precisa ser um número inteiro' })
  professorID: number;

  @IsNotEmpty({ message: 'disciplinaID é obrigatório' })
  @IsInt({ message: 'disciplinaID precisa ser um número inteiro' })
  disciplinaID: number;

  @IsNotEmpty({ message: 'Conteúdo é obrigatório' })
  @IsString({ message: 'Conteúdo precisa ser uma string' })
  conteudo: string;

}