// Criação do server
// estamos importando o a function express e colocando em uma const
const express = require("express")
const server = express()
const routes = require("./routes")
const path = require("path")

// usando template engine
server.set('view engine', 'ejs')

// Mudar a localização da pasta views
server.set('views', path.join(__dirname, 'views'))
 
// middleware, habilitar arquivos statics - criando uma rota para cada elemento do public
server.use(express.static("public")) 

//liberação para usar o req.body em uma rquisição
server.use(express.urlencoded({ extended: true }))

//routes 
server.use(routes)

// listen é uma functionalidade que vai ligar nosso server 
server.listen(3001, () => console.log("rodando"))