// Criação do server
// estamos importando o a function express e colocando em uma const
const express = require("express")
const server = express()
const routes = require("./routes")

// usando template engine
server.set('view engine', 'ejs')

// middleware, habilitar arquivos statics - criando uma rota para cada elemento do public
server.use(express.static("public"))

//routes 
server.use(routes)

// listen é uma functionalidade que vai ligar nosso server 
server.listen(3000, () => console.log("rodando"))