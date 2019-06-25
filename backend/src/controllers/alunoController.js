const mongoose = require('mongoose') // importando o mongoose

const alunos = mongoose.model('alunos') // instanciando o model de produto

module.exports = {
    
    //rota de listagem de alunos
    async listar(req, res){
        const aluno = await alunos.find()
        res.header("Access-Control-Allow-Origin", "*")
        return res.json(aluno) // retornando um JSON para os clientes
    },

    //rota de add aluno
    async cadastrar(req, res){
        const aluno = await alunos.create(req.body)
        return res.json(aluno)
    },
    
    //rota de listar um aluno
    async listarPorId(req, res){
        const aluno = await alunos.findById(req.params.id)

        return res.json(aluno)
    },

    //rota para atualização de alunos
    async atualizar(req, res){
        const aluno = await alunos.findByIdAndUpdate(
            req.params.id, 
            req.body, 
            {new: true})// {new: true} serve para atualizar o valor da variável produtos

        return res.json(aluno)
    },

    //rota para deletar livros
    async deletar(req, res){
        await alunos.findByIdAndRemove(req.params.id) //sem pegar produto, sem retorno

        return res.send('sucesssso')
    }


}

