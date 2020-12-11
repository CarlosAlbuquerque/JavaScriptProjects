// npm é node package manager, gerenciador de depedencias do node
//package json - npm init -y
//instalar modulo - npm install express

const express = require("express")  //to pedindo o express instalado ecolocando na var
const server = express() //executando a function express
//pegar o banco de dados
const db = require("./database/db.js")
//configurar pasta public
server.use(express.static("public"))

//habilitar o uso do req.body na nossa aplicacao
server.use(express.urlencoded({extended: true}))


//utilizando template enginner - nunjeks
const nunjucks = require("nunjucks")
nunjucks.configure("src/views", {
    express: server,
    noCache: true
})


//configurar caminhos da minha aplicação
//principal caminho - home -pagina inicial
// req é uma requisição, um pedido
// res é uma respota
server.get("/", (req, res) => {
    return res.render("index.html", { title: "Seu marketplace de coleta de resíduos"}) 
})



server.get("/create-point", (req, res) => {

    //req.query: query strings das nossa URL
    //console.log(req.query)


    return res.render("create-point.html")  //, {saved: true}
})


server.post("/savepoint", (req, res) => {
    

    // req.body: O corpo do nosso forms
    //console.log(req.body)

    const query = `
        INSERT INTO places (
            name,
            image,
            address,
            address2,
            state,
            city,
            items
        ) VALUES (?, ?, ?, ?, ?, ?, ?);
    `
    const values =  [
        req.body.name,
        req.body.image,
        req.body.address,
        req.body.address2,
        req.body.state,
        req.body.city,
        req.body.items

    ]
 
    function afterInsertData(err){
        if(err) {
            console.log(err)
            return res.send("Erro no cadastro!")
        }
        console.log("Cadastrado com sucesso")
        console.log(this)

        return res.render("create-point.html", {saved: true})
    }

    db.run(query, values, afterInsertData) 


})






server.get("/search", (req, res) => {

    const search = req.query.search

    if(search == ""){
        //pesquisa vazia
        return res.render("search-results.html", {total: 0})
    }



    //pegar os dados do banco de dados
        db.all(`SELECT * FROM places WHERE city LIKE '%${search}%';`, function(err, rows){
            if(err) {
                return console.log(err)
            }

            //length conta quantos elementos temos dentro do array
            const total = rows.length

            //mostrar a pagina html com os dados do banco de dados
            return res.render("search-results.html", {places: rows, total: total}) 
        })

})

// Ligar o server
server.listen(3000)