/*
  Warnings:

  - Added the required column `idade` to the `Estudante` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX `Estudante_turmaId_fkey` ON `estudante`;

-- AlterTable
ALTER TABLE `estudante` ADD COLUMN `idade` INTEGER NOT NULL,
    MODIFY `turmaId` INTEGER NULL;

-- AddForeignKey
ALTER TABLE `Estudante` ADD CONSTRAINT `Estudante_turmaId_fkey` FOREIGN KEY (`turmaId`) REFERENCES `Turma`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
