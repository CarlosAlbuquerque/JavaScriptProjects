
function populateUFs() {
    const ufSelect = document.querySelector("select[name=uf]")

    fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados")
    .then((res) => {return res.json() })
    .then( states => {

        for( const state of states) {//para cadas state de states vou colocar nessa variavel e vou entra no bloco de codigo
            ufSelect.innerHTML += `<option value=${state.id}>${state.nome}</option>` //o id e nome está pegando do json que veio da API de UFS
        }

    } )
}

populateUFs() 

function getCities(event) {
    const citySelect = document.querySelector("select[name=city]")
    const stateInput = document.querySelector("input[name=state]")

    const ufValue = event.target.value //ta pegando o value do state.id que está sendo passando no campo UF 
    
    
    const indexOfSelectedState = event.target.selectedIndex
    stateInput.value = event.target.options[indexOfSelectedState].text

    
    const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufValue}/municipios`

    citySelect.innerHTML = "<option value>Selecione a Cidade</option>"
    citySelect.disabled = true


    fetch(url)
    .then( resp => resp.json() )
    .then( cities => {


        for( const city of cities ) {
            citySelect.innerHTML += `<option value = "${city.nome}"> ${city.nome} </option>` //o id e nome está pegando do json que veio da API de UFS
        }

        citySelect.disabled = false
    } )
}
console.log(city)
document
    .querySelector("select[name=uf]") //procura o select que tem o name uf
    .addEventListener("change", getCities)//essa função sempre vai ficar ligada quando houver o evento de change no select

//Itens de coleta
//pegar todos os LIs

const itemsToCollect = document.querySelectorAll(".items-grid li")

for (const item of itemsToCollect){
    item.addEventListener("click", handleSelectedItem)
}

// var para os itens selecionados
const collectedItems = document.querySelector("input[name=items]")


let selectedItems = [] //let variavel que pode mudar de valor, const é constante n muda


function handleSelectedItem(event) {
    const itemLi = event.target
    //adicionar ou remover uma classe com JS --> toggle, remove ou add
    itemLi.classList.toggle("selected")

    const itemId = itemLi.dataset.id
    //console.log('ItemID: ', itemId)

    // verifcar se existe items selecionados, se sim
    // pegar os itens selecionado
    const alreadySelected = selectedItems.findIndex( function(item) {
        const itemFound = item  == itemId //isso será true ou flase
        return itemFound //entao coloca na variavel e retornar a var
    })

    // se já estiver selecionado
    if(alreadySelected >= 0){
        //tirar da seleção
        const filteredItems = selectedItems.filter( item => {
            const ItemIsDifferent = item  != itemId //false
            return ItemIsDifferent
        })
        selectedItems = filteredItems 
    }else{
    // se não estiver selecionado
    //adicionar a seleção
        selectedItems.push(itemId)//push coloca o elemento dentro do array
    }
    //console.log('selectedItems: ', selectedItems)

    // atualizar o campo escondindo com os itens selecionados, o hidden
    collectedItems.value = selectedItems

}