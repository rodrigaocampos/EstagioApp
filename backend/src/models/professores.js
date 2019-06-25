const mongoose = require('mongoose')

// criando o model de produto

const professoresSchema = new mongoose.Schema({
    nome: {
        type: String,
        required: true
    },
    login:{
        type: String,
        required: true
    },
    senha: {
        type:String,
        required: true
    },
    criadoEm:{
        type: Date,
        default: Date.now
    },
   
    

})

mongoose.model('professores', professoresSchema)