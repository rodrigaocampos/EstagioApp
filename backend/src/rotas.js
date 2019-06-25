const express = require('express')
const rotas = express.Router()

const professoresController = require('./controllers/professorController')
const alunosController = require('./controllers/alunoController')

// rotas professores
rotas.get('/professores', professoresController.listar)
rotas.get('/professores/:id', professoresController.listarPorId)
rotas.post('/professores', professoresController.cadastrar)
rotas.put('/professores/:id', professoresController.atualizar)
rotas.delete('/professores/:id', professoresController.deletar)

rotas.get('/alunos', alunosController.listar)
rotas.get('/alunos/:id', alunosController.listarPorId)
rotas.post('/alunos', alunosController.cadastrar)
rotas.put('/alunos/:id', alunosController.atualizar)
rotas.delete('/alunos/:id', alunosController.deletar)


module.exports = rotas // exportando as rotas 