import {
  IsNotEmpty,
  IsInt,
} from 'class-validator';

export class CreateProfessorDisciplinaDto{

    @IsNotEmpty({ message: 'professorID é obrigatório' })
    @IsInt({ message: 'professorID precisa ser um número inteiro' })
    professorID: number;

    @IsNotEmpty({ message: 'disciplinaID é obrigatório' })
    @IsInt({ message: 'disciplinaID precisa ser um número inteiro' })
    disciplinaID: number;
}