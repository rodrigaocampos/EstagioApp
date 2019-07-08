//servidor express
const express = require('express')
const bodyParser = require('body-parser')//importando o body parser
const app = express()
const MongoClient = require('mongodb').MongoClient; //importando o mongo client
const {ObjectID} = require('mongodb');

//conectando ao banco em cloud, tipo um cursor de mysql msm
const uri = "mongodb://admin1234:admin1234@ds243317.mlab.com:43317/eng"

//ativando o bodyParser o método urlencoded diz que o bodyParser pode extrair do form e add no body no html da page
app.use(bodyParser.urlencoded({extended: true}))

//utilizando a view engine ejs
app.set('view engine', 'ejs')

const PORT =   process.env.PORT || 3000
//diz que o servidor só iniciará quando estiver conectado ao mongodb
MongoClient.connect(uri, function(err, client) {

    if (err) return console.log(err)//verifica e retorna o erro
    db = client.db('eng') //aqui colocamos o nome do db

    //colocando o server para rodar na porta 3000
    app.listen(PORT, function(){
        console.log('Está rodando na porta 3000')
    })
})



//primeira resposta do server.js

app.get('/', (req, res) => {
    res.render('login.ejs')
    let cursor = db.collection('data').find()// busca os dados no db
})

app.get('/cadastrar', (req, res) => {
    res.render('index.ejs')
    let cursor = db.collection('data').find()// busca os dados no db
})

//resposta da rota /lista
app.get('/lista', (req, res) => {
    db.collection('data').find().sort({turma: -1}).toArray((err, results) => {
        if (err) return console.log(err)
        res.render('lista.ejs', { data: results }) //renderiza o lista.ejs
        console.log(results[0].nome)

    })
})






//post listagem
app.post('/lista', (req, res) => {

    db.collection('data').insertOne(req.body, (err, result)=> {
    if(err) return console.log(err)
    console.log('salvo no banco de dados')
    res.redirect('/lista')
        db.collection('data').find().toArray((err, results) =>{
            teste = results
            console.log(teste)
        })
    })
})

//rota da atualização
app.route('/edit/:id')
.get((req, res) => {
    var id = req.params.id
    db.collection('data').find(ObjectID(id)).toArray((err, result) => {
        if (err) return res.send(err)
        res.render('edit.ejs', {data:result})
    })
})


app.route('/edit/:id')
.post((req, res) => {
    var id = req.params.id
    var nome = req.body.nome
    var matricula = req.body.matricula
    var email= req.body.email
    var turma = req.body.turma
    var orientador = req.body.orientador
    var local = req.body.local
    var inicio = req.body.inicio
    var termino = req.body.termino

    db.collection('data').updateOne({_id: ObjectID(id)},  {
        $set:{
            nome: nome,
            matricula: matricula,
            email: email,
            turma: turma,
            orientador: orientador,
            local: local,
            inicio: inicio,
            termino: termino
        }
    
    }, (err, result) => {
        if (err) return res.send(err)
        res.redirect('/lista')
        console.log('Atualizando o Banco de dados')    

    })
})

//rota de delete
app.route('/delete/:id')
.get((req, res) => {
    var id = req.params.id
    db.collection('data').deleteOne({_id: ObjectID(id)}, (err, result) => {
        if (err) return res.send(500, err)
        console.log('deletando do bd')
        res.redirect('/lista')
    })
})

//rota da atualização das etapas
app.route('/etapas/:id')
.get((req, res) => {
    var id = req.params.id
    db.collection('data').find(ObjectID(id)).toArray((err, result) => {
        if (err) return res.send(err)
        res.render('etapas.ejs', {data:result})
    })
})


app.route('/etapas/:id')
.post((req, res) => {
    var id = req.params.id
    var nome = req.body.nome
    var etapa1 = req.body.etapa1
    var etapa2= req.body.etapa2
    var etapa3 = req.body.etapa3

    db.collection('data').updateOne({_id: ObjectID(id)},  {
        $set:{
            nome: nome,
            etapa1: etapa1,
            etapa2: etapa2,
            etapa3: etapa3
        }
    
    }, (err, result) => {
        if (err) return res.send(err)
        res.redirect('/lista')
        console.log('Atualizando o Banco de dados')    

    })
})


// cadastrar professor

app.post('/cadastraProfessor', (req, res) => {

    db.collection('professor').insertOne(req.body, (err, result)=> {
    if(err) return console.log(err)
    console.log('professor salvo no banco de dados')
    res.redirect('/')
    })
})

app.get('/cadastrarProfessor', (req, res) => {
    res.render('cadastraProfessor.ejs')
})



//rota de login


app.route('/login/')
.get((req, res) => {
    var id = req.params.id
    db.collection('data').find(ObjectID(id)).toArray((err, result) => {
        if (err) return res.send(err)
        res.render('login.ejs', {data:result})
    })
})

// login erro
app.get('/loginErro', (req, res) => {
    res.render('loginErro.ejs')
})

// valida login

app.post('/validaLogin', (req, res) => {

        usuario = req.body.usuario 
        senha = req.body.senha

        db.collection('professor').find().toArray((err, results) =>{
            let professores = results
            let acesso = 0
            for (const professor of professores) {
                console.log(professor.nome)
                
                if (professor.usuario == usuario && professor.senha == senha) {
                    acesso = 1
                }else{
                    acesso = 2
                }

            }

            if (acesso == 1){
                res.redirect('/lista')
            }else{
                res.redirect('loginErro')
            }
    
  
        })

       
    
})





module.exports = app