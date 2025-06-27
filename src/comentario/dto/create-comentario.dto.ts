import {
  IsNotEmpty,
  IsString,
  IsInt,
} from 'class-validator';

export class CreateComentarioDto {

  @IsNotEmpty({ message: 'usuarioID é obrigatório' })
  @IsInt({ message: 'usuarioID precisa ser um número inteiro' })
  usuarioID: number;

  @IsNotEmpty({ message: 'avaliacaoID é obrigatório' })
  @IsInt({ message: 'avaliacaoID precisa ser um número inteiro' })
  avaliacaoID: number;

  @IsNotEmpty({ message: 'Conteúdo é obrigatório' })
  @IsString({ message: 'Conteúdo precisa ser uma string' })
  conteudo: string;

}