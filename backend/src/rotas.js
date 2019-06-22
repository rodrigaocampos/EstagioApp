const express = require('express')
const rotas = express.Router()

const professoresController = require('./controllers/professorController')

// rotas professores
rotas.get('/professores', professoresController.listar)
rotas.get('/professores/:id', professoresController.listarPorId)
rotas.post('/professores', professoresController.cadastrar)
rotas.put('/professores/:id', professoresController.atualizar)
rotas.delete('/professores/:id', professoresController.deletar)


module.exports = rotas // exportando as rotas 