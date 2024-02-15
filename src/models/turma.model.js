// models/turma.js

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
async function listarTurmas() {
  try {
    const turmas = await prisma.turma.findMany();
    return turmas;
  } catch (error) {
    throw new Error('Erro ao obter turmas: ' + error.message);
  }
}

module.exports = {
  listarTurmas,
};
