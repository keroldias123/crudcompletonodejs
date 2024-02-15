/*
  Warnings:

  - You are about to drop the column `idade` on the `estudante` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX `Estudante_turmaId_fkey` ON `estudante`;

-- AlterTable
ALTER TABLE `estudante` DROP COLUMN `idade`;

-- AddForeignKey
ALTER TABLE `Estudante` ADD CONSTRAINT `Estudante_turmaId_fkey` FOREIGN KEY (`turmaId`) REFERENCES `Turma`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
