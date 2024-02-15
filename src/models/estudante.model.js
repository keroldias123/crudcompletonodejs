// estudante.model.js
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();


async function criarEstudante(nome, turmaId) {
  try {
    // Convertendo turmaId para Int, se necessário
    const turmaIdInt = parseInt(turmaId);

    // Criando o estudante
    const novoEstudante = await prisma.estudante.create({
      data: {
        nome: nome,
        turmaId: turmaIdInt, // Usando turmaIdInt em vez de turmaId
      }
    });

    return novoEstudante;
  } catch (error) {
    throw new Error('Erro ao criar estudante: ' + error.message);
  }
}



async function obterTodosEstudantes() {
  return prisma.estudante.findMany({
    include: { turma: true },
  });
}



async function getEstudante(estudanteId) {
  try {
    const estudante = await prisma.estudante.findUnique({
      where: {
        id: estudanteId,
      },
    });

    if (!estudante) {
      throw new Error('Estudante não encontrado');
    }

    return estudante;
  } catch (error) {
    throw new Error('Erro ao obter estudante: ' + error.message);
  }
}

async function editarEstudante(id, dadosAtualizados) {
 const estudante = await prisma.estudante.update({
    where: {
      id,
    },
    data: dadosAtualizados
  });
  return estudante;
}


async function eliminarEstudante(estudanteId) {
   try {
        // Certifique-se de que o ID seja passado como um número inteiro
        const estudanteEliminado = await prisma.estudante.delete({
            where: {
                id: estudanteId
            }
        });
        return estudanteEliminado;
0    } catch (error) {
        throw new Error('Erro ao eliminar estudante: ' + error.message);
    }
}

async function pesquisarPorNome(nome) {
    try {
        const estudantes = await prisma.estudante.findMany({
            where: {
                nome: {
                    contains: nome
                }
            },
            include: {
                turma: true // Expande os dados da turma relacionada
            }
        });
        return estudantes;
    } catch (error) {
        console.error('Erro ao pesquisar estudantes por nome:', error);
        throw error;
    }
}


async function pesquisarPorId(id) {
    try {
        const estudante = await prisma.estudante.findUnique({
            where: {
                id: parseInt(id)
            },
            include: {
                turma: true // Expande os dados da turma relacionada
            }
        });
        return estudante;
    } catch (error) {
        console.error('Erro ao pesquisar estudante por ID:', error);
        throw error;
    }
}


module.exports = {
  criarEstudante,
  obterTodosEstudantes,
  editarEstudante,
  getEstudante,
  eliminarEstudante,
  pesquisarPorNome,
  pesquisarPorId,
};

