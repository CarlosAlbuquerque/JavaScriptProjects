// importar a depedencia do sqlite3
const sqlite3 = require("sqlite3").verbose()

//criar o objeto que ia fazer operaçoes no banco de dados // a palavra new quando colocada em um constructor dá pra criar um ojeto
const db = new sqlite3.Database("./src/database/database.db")
 
//eportar o objeto db
module.exports = db

//utilizar o objeto de banco de dados para nossas operaçoes
//a funcao serialize ele so quer dizer que vai rodar uma sequencia de codigos 
//  db.serialize(() => {

    //com comandos sql eu vou:

    //1 - criar uma tabela 
        // db.run(`
            // CREATE TABLE IF NOT EXISTS places (
                // id INTEGER PRIMARY KEY AUTOINCREMENT,
                // name TEXT,
                // image TEXT,
                // address TEXT,
                // address2 TEXT,
                // state TEXT,
                // city TEXT,
                // items TEXT
            // );
        // `)
            //INTEGER - tipo inteiro
            //PRIMARY KEY - CHAVE PRIMARIA -CINTIA HEHEHE
            //AUTOINCREMENT - AUTO INCREMENTO
            
        
    //2 - cinserir dados na tabela
    // const query = `
        // INSERT INTO places (
            // name,
            // image,
            // address,
            // address2,
            // state,
            // city,
            // items
        // ) VALUES (?, ?, ?, ?, ?, ?, ?);
    // `
    // const values =  [
        // "Papersider",
        // "https://images.unsplash.com/photo-1528323273322-d81458248d40?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1602&q=80",
        // "Rua São Sebastião, Santo Amaro",
        // "Nº 305",
        // "São Paulo",
        // "São Paulo",
        // "Papéis e papelão"
    // ]
 
    //essa function é um callback chame mais tarde, so vai rodar depois que fizer a query, colocar o values,
    // enquanto ela está esperando a resposta o restante da nossa aplicação vai continuar rodando
    //podemos usar o exemplo de um loja, quando vai ver uma roupa e pedimos pra ver se tem tal tamanho
    //o vendendor vai buscar no estoque enquanto isso vamos fazer o restante da nossa pesquisa na loja
    //assim que ele voltar com a roupa voltamos a avaliar a roupa desejada

        // function afterInsertData(err){
            // if(err) {
                // return console.log(err)
            // }
// 
            // console.log("Cadastrado com sucesso")
            // console.log(this)
        // }

    //this traz a resposta escondido do run

        //db.run(query, values, afterInsertData) 
        //como ja inserimos essa função podemos comentar pq não queremos mais usar ela, pois ja inserimos todos os dados

    //3 - consultar dados da tabela

        // db.all(`SELECT * FROM places;`, function(err, rows){
        //     if(err) {
        //         return console.log(err)
        //     }
        
        //     console.log("Aqui estão seus registros")
        //     console.log(rows)
        // })

    // 4 - deletar um dado de tabela
        // db.run(`DELETE FROM places WHERE id = ?;`, [10], function(err) {
            // if(err) {
                // return console.log(err)
            // }
// 
            // console.log("Registro deletado com sucesso")
        // })
// })

//para rodar -- node/src/database/db.js