const mongoose = require('mongoose')

// criando o model de aluno

const alunosSchema = new mongoose.Schema({
    nome: {
        type: String,
        required: true
    },
    matricula:{
        type: Number,
        required: true
    },
    turma: {
        type:String,
        required: true
    },
    email:{
        type: String,
        required:true
    },
    etapaum: {
        type: Boolean,
        required: true
    },
    etapadois: {
        type: Boolean,
        required:true
    },
    etapatres: {
        type: Boolean,
        required:true
    }
})

mongoose.model('alunos', alunosSchema)