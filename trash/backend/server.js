const express = require('express') // importando o express
const mongoose = require('mongoose') // importando o ORM mongoogse 
const requireDir = require('require-dir')
const cors = require("cors")


const app = express() // chamando a função express para o server


app.use(cors())
app.use(express.json()) // habilitando a troca de dados JSON

mongoose.connect('mongodb://admin1234:admin1234@ds243317.mlab.com:43317/estagio-bd', {useNewUrlParser: true}) // Iniciando o DB

requireDir('./src/models') // dando require para buscar todos os models

// chamando as rotas
app.use("/api", require("./src/rotas")) 

app.listen(3000, function() {
    console.log("rodando na porta 3000")
})// colocando para rodar em localhost:3000

