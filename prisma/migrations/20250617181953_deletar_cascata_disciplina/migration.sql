-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_ProfessorDisciplina" (
    "professorID" INTEGER NOT NULL,
    "disciplinaID" INTEGER NOT NULL,

    PRIMARY KEY ("professorID", "disciplinaID"),
    CONSTRAINT "ProfessorDisciplina_professorID_fkey" FOREIGN KEY ("professorID") REFERENCES "Professor" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "ProfessorDisciplina_disciplinaID_fkey" FOREIGN KEY ("disciplinaID") REFERENCES "Disciplina" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_ProfessorDisciplina" ("disciplinaID", "professorID") SELECT "disciplinaID", "professorID" FROM "ProfessorDisciplina";
DROP TABLE "ProfessorDisciplina";
ALTER TABLE "new_ProfessorDisciplina" RENAME TO "ProfessorDisciplina";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
