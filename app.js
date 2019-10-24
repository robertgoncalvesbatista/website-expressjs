const express = require('express')
const app = express()
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const handlebars = require('express-handlebars')
const admin = require('./routes/admin')
const path = require('path')
const session = require('express-session')
const flash = require('connect-flash')

//Configurações

    //Sessão
    app.use(session({
        secret: 'G8EaD23@$d',
        resave: true,
        saveUninitialized: true
    }))
    app.use(flash())

    //Middleware
    app.use(function(req, res, next){
        res.locals.success_msg = req.flash('success_msg')
        res.locals.error_msg = req.flash('error_msg')
        next()
    })

    //Body Parser
    app.use(bodyParser.urlencoded({extended: true}))
    app.use(bodyParser.json())

    //Handlebars
    app.engine('handlebars', handlebars({defaultLayout: 'main'}))
    app.set('view engine', 'handlebars')
/*
    //Mongoose
    const options = {useUnifiedTopology: true, useNewUrlParser: true}

    mongoose.Promise = global.Promise
    mongoose.connect('mongodb://localhost/g8', options).then(function(){
        console.log('Conectado ao mongo')
    }).catch(function(err){
        console.log('Erro ao se conectar: '+err)
    })
*/
    //Public
    app.use(express.static(path.join(__dirname, 'public')))

//Rotas
app.use('/admin', admin)

//Outros
const PORT = 8081
app.listen(PORT, function(){
    console.log('Servidor rodando!')
})