import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsuarioModule } from './usuario/usuario.module';
import { ProfessorModule } from './professor/professor.module'; 
import { ComentarioModule } from './comentario/comentario.module'; 
import { AvaliacaoModule } from './avaliacao/avaliacao.module';
import { DisciplinaModule } from './disciplina/disciplina.module';
import { ProfessorDisciplinaModule } from './professor-disciplina/professor-disciplina.module';
import { AuthModule } from './auth/auth.module'; // 👈 importa o AuthModule

@Module({
  imports: [
    UsuarioModule,
    ProfessorModule,
    ComentarioModule,
    AvaliacaoModule,
    DisciplinaModule,
    ProfessorDisciplinaModule,
    AuthModule, // 👈 adiciona aqui também
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
