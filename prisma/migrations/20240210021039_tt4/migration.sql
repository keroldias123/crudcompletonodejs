/*
  Warnings:

  - Made the column `turmaId` on table `estudante` required. This step will fail if there are existing NULL values in that column.

*/
-- DropIndex
DROP INDEX `Estudante_turmaId_fkey` ON `estudante`;

-- AlterTable
ALTER TABLE `estudante` MODIFY `turmaId` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `Estudante` ADD CONSTRAINT `Estudante_turmaId_fkey` FOREIGN KEY (`turmaId`) REFERENCES `Turma`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
