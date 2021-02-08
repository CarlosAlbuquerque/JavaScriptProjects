//Open and close modal
function modal(){
    const modal = document.querySelector(".modal-overlay");
    modal.classList.toggle("active");
 }

//pegar e guardar as informações de transaction no Storage
const Storage = {
    get() {
        //json parse vai transformar o array que convertemos para string
        //no set e transformar em array novamente ou vai retornar um array vazio
        return JSON.parse(localStorage.getItem('dev.finances:transactions')) || []
        console.log(localStorage)
    },

    set(transactions) {
        localStorage.setItem("dev.finances:transactions", 
        JSON.stringify(transactions))
    }
}

// Operations, soma, sub, total, add, remove
const Transaction = {
    all: Storage.get(),

    add(transaction){
        Transaction.all.push(transaction)

        App.reload()
    },

    remove(index){
        Transaction.all.splice(index, 1)

        App.reload()
    },

    incomes(){
        let income = 0
        // pegar todas as transacoes
        // para cada transacao forEach
        Transaction.all.forEach(transaction => {
            //se ela for maior que 0
            if (transaction.amount >= 0) {
                //somar a uma variavel e retorna a variavel
                income += transaction.amount;
            }
        })
        
        return income;
    },

    expenses(){
        let expense = 0
        Transaction.all.forEach(transaction => {
            if (transaction.amount < 0) {
                expense += transaction.amount;
            }
        })

        return expense;
    },

    total(){

        let total = Transaction.incomes() + Transaction.expenses();

        return total;
    }
}

// substituir os dados do HTML com o dados das transações no JS
const DOM = {
    transactionsContainer: document.querySelector('#data-table tbody'),

    addTransaction(transaction, index){
        const tr = document.createElement('tr')
        tr.innerHTML = DOM.innerHTMLTransaction(transaction)
        tr.dataset.index = index

        DOM.transactionsContainer.appendChild(tr)
    },

    innerHTMLTransaction(transaction, index){
        const CSSclass = transaction.amount > 0 ? "income" : "expense"

        const amount = utils.formatCurrency(transaction.amount)
        
        const html = `
            <td class="description">${transaction.description}</td>
            <td class="${CSSclass}">${amount}</td>
            <td class="data">${transaction.date}</td>
            <td><img onclick="Transaction.remove(${index})" src="./assets/minus.svg" alt="Remover transação"></td>
        `
        
        return html
    },

    updateBalance(){
        document.getElementById('incomeDisplay').innerHTML = `${utils.formatCurrency(Transaction.incomes())}`
        document.getElementById('expanseDisplay').innerHTML = `${utils.formatCurrency(Transaction.expenses())}`
        document.getElementById('totalDisplay').innerHTML = `${utils.formatCurrency(Transaction.total())}`
    },

    clearTransactions(){
        DOM.transactionsContainer.innerHTML = ""
    }
}

//Formatar o sinal e o tipo de moeda
const utils = {
    formatAmount(value){
        value = Number(value.replace(/\,\./g, "")) * 100
        
        return value
    },

    formatDate(date){
        const splittedDate = date.split('-')
        return `${splittedDate[2]}/${splittedDate[1]}/${splittedDate[0]}`
    },

    formatCurrency(value){
        const signal = Number(value) < 0 ? "-" : ""

        value = String(value).replace(/\D/g, "")
        // /\D/g pega todos o valores da string que nao sao numeros

        value = Number(value) / 100

        value = value.toLocaleString("pt-br", {
            style: "currency",
            currency: "BRL"
        })

        return signal + value
    }

}

//Capturar os dados do forms
const Form = {
    description: document.querySelector('input#description'),
    amount: document.querySelector('input#amount'), 
    date: document.querySelector('input#date'),

    getValues(){
        return {
            description: Form.description.value,
            amount: Form.amount.value,
            date: Form.date.value
        }
    },

    validateField(){
        const { description, amount, date} = Form.getValues()
    
        if (description.trim() === "" ||
            amount.trim() === "" || 
            date.trim() === ""){
                throw new Error("Por favor, preencha todos os campos")
        }
    },

    formatValues(){
        let { description, amount, date} = Form.getValues()

        amount = utils.formatAmount(amount)

        date = utils.formatDate(date)

        return {
            description,
            amount,
            date
        }

    },

    clearFields(){
        Form.description.value = ""
        Form.amount.value = ""
        Form.date.value = ""
    },

    submit(event){
        //interrompe o comportamento padrão de submit
        event.preventDefault()

        try {
        // verificar se todas as informações foram preenchidas
        Form.validateField()

        // formatar os dados para salvar
        const transaction = Form.formatValues()

        // salvar
        Transaction.add(transaction)
        // apagar os dados do form
        Form.clearFields()
        // modal feche
        modal()
        // atualizar a aplicação ja atualizamos quando damos um add()
        } catch (error) {
            alert(error.message)
        }
    }

}

//Inicializar e reiniciar aplicação
const App = {
    init(){

        //Loop para adicionar um item na lista usando ForEach(Para cada item)
            Transaction.all.forEach((transaction, index) => {
                DOM.addTransaction(transaction, index)
            })

        //execução da function de atualizar o Display
            DOM.updateBalance()

        //atualizando o local storage
            Storage.set(Transaction.all)
    },
    reload(){
        DOM.clearTransactions()
        App.init()
    }
}

//Inicialização da aplicação
App.init()