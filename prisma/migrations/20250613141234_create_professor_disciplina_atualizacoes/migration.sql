/*
  Warnings:

  - You are about to drop the `Comentarios` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the column `professorID` on the `Disciplina` table. All the data in the column will be lost.
  - You are about to alter the column `disciplinaID` on the `Professor` table. The data in that column could be lost. The data in that column will be cast from `String` to `Int`.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Comentarios";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "ProfessorDisciplina" (
    "professorID" INTEGER NOT NULL,
    "disciplinaID" INTEGER NOT NULL,

    PRIMARY KEY ("professorID", "disciplinaID"),
    CONSTRAINT "ProfessorDisciplina_professorID_fkey" FOREIGN KEY ("professorID") REFERENCES "Professor" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "ProfessorDisciplina_disciplinaID_fkey" FOREIGN KEY ("disciplinaID") REFERENCES "Disciplina" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Comentario" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "usuarioID" INTEGER NOT NULL,
    "avaliacaoID" INTEGER NOT NULL,
    "conteudo" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Comentario_usuarioID_fkey" FOREIGN KEY ("usuarioID") REFERENCES "Usuario" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Comentario_avaliacaoID_fkey" FOREIGN KEY ("avaliacaoID") REFERENCES "Avaliacao" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Avaliacao" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "usuarioID" INTEGER NOT NULL,
    "professorID" INTEGER NOT NULL,
    "disciplinaID" INTEGER NOT NULL,
    "conteudo" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Avaliacao_usuarioID_fkey" FOREIGN KEY ("usuarioID") REFERENCES "Usuario" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Avaliacao_professorID_fkey" FOREIGN KEY ("professorID") REFERENCES "Professor" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Avaliacao_disciplinaID_fkey" FOREIGN KEY ("disciplinaID") REFERENCES "Disciplina" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Avaliacao" ("conteudo", "createdAt", "disciplinaID", "id", "professorID", "updatedAt", "usuarioID") SELECT "conteudo", "createdAt", "disciplinaID", "id", "professorID", "updatedAt", "usuarioID" FROM "Avaliacao";
DROP TABLE "Avaliacao";
ALTER TABLE "new_Avaliacao" RENAME TO "Avaliacao";
CREATE TABLE "new_Disciplina" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nome" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_Disciplina" ("createdAt", "id", "nome", "updatedAt") SELECT "createdAt", "id", "nome", "updatedAt" FROM "Disciplina";
DROP TABLE "Disciplina";
ALTER TABLE "new_Disciplina" RENAME TO "Disciplina";
CREATE TABLE "new_Professor" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nome" TEXT NOT NULL,
    "disciplinaID" INTEGER NOT NULL,
    "departamento" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_Professor" ("createdAt", "departamento", "disciplinaID", "id", "nome", "updatedAt") SELECT "createdAt", "departamento", "disciplinaID", "id", "nome", "updatedAt" FROM "Professor";
DROP TABLE "Professor";
ALTER TABLE "new_Professor" RENAME TO "Professor";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
