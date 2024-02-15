// estudante.routes.js
const express = require('express');
const router = express.Router();
const estudanteModel = require('../models/estudante.model');
const turmaModel = require('../models/turma.model');

// Listar todos os estudantes
router.get('/estudantes', async (req, res) => {
  const estudantes = await estudanteModel.obterTodosEstudantes();
  res.json(estudantes);
}); 



router.get('/listarTurmas', async (req, res) => {
  try {
    const turmas = await turmaModel.listarTurmas();
    res.json({ turmas });
  } catch (error) {
    console.error('Erro ao obter turmas:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
});

// Criar um novo estudante
router.post('/estudantes/add', async (req, res) => {
  const { nome, turmaId } = req.body;
  const estudante = await estudanteModel.criarEstudante(nome, turmaId);
  res.json(estudante);
});


// Rota para atualizar um estudante existente
// Rota para obter os dados do estudante
router.get('/getid/:id', async (req, res) => {
  const estudanteId = parseInt(req.params.id);

  try {
    const estudante = await estudanteModel.getEstudante(estudanteId);
    res.json(estudante);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
});

// Rota para atualizar um estudante
router.put('/estudantes/editar/:id', async (req, res) => {
  const id = parseInt(req.params.id);
  const { nome, turmaId } = req.body;
  // Verifica se o turmaId é uma string representando um número e converte para inteiro
  const novoTurmaId = typeof turmaId === 'string' ? parseInt(turmaId) : turmaId;

  try {
    const estudante = await estudanteModel.editarEstudante(id,{ nome, turmaId: novoTurmaId });
    res.json(estudante);
  } catch (error) {
    console.error('Erro ao atualizar estudante:', error);
    res.status(500).json({ error: 'Erro ao atualizar estudante' });
  }
});

// Eliminar um estudante
router.delete('/eliminar/:id', async (req, res) => {
  try {
        const estudanteId = parseInt(req.params.id); // Converta o ID para inteiro
        await estudanteModel.eliminarEstudante(estudanteId); // Chame a função do modelo
        res.json({ message: 'Estudante eliminado com sucesso' });
    } catch (error) {
        console.error('Erro ao eliminar estudante:', error);
        res.status(500).json({ error: 'Erro ao eliminar estudante' });
    }
});

// Rota para pesquisar um estudante por nome
router.get('/pesquisar/nome/:nome', async (req, res) => {
   const nome = req.params.nome;
    try {
        const estudantes = await estudanteModel.pesquisarPorNome(nome);
        res.json(estudantes);
    } catch (error) {
        console.error('Erro ao pesquisar estudantes por nome:', error);
        res.status(500).json({ error: 'Erro ao pesquisar estudantes por nome' });
    }
});

router.get('/pesquisar/id/:id', async (req, res) => {
    const id = req.params.id;
    try {
        const estudante = await estudanteModel.pesquisarPorId(id);
        res.json(estudante);
    } catch (error) {
        console.error('Erro ao pesquisar estudante por ID:', error);
        res.status(500).json({ error: 'Erro ao pesquisar estudante por ID' });
    }
});


module.exports = router;
