const mongoose = require('mongoose') // importando o mongoose

const professores = mongoose.model('professores') // instanciando o model de produto

module.exports = {
    
    //rota de listagem de professores
    async listar(req, res){
        const professor = await professores.find()
        res.header("Access-Control-Allow-Origin", "*")
        return res.json(professor) // retornando um JSON para os clientes
    },

    //rota de add professor
    async cadastrar(req, res){
        const professor = await professores.create(req.body)
        return res.json(professor)
    },
    
    //rota de listar um professor
    async listarPorId(req, res){
        const professor = await professores.findById(req.params.id)

        return res.json(professor)
    },

    //rota para atualização de professores
    async atualizar(req, res){
        const professor = await professores.findByIdAndUpdate(
            req.params.id, 
            req.body, 
            {new: true})// {new: true} serve para atualizar o valor da variável produtos

        return res.json(professor)
    },

    //rota para deletar livros
    async deletar(req, res){
        await professores.findByIdAndRemove(req.params.id) //sem pegar produto, sem retorno

        return res.send('sucesssso')
    }


}

