const img = document.querySelector('img')
function callback(){
    console.log('Clicou')
}
img.addEventListener('click', callback)

// Quando o usuário clicar nos links internos do site,
// adicion// Quando o usuário clicar nos links internos do site,
// adicione a classe ativo ao item clicado e remova dos
// demais itens caso eles possuam a mesma. Previna
// o comportamento padrão desses links
const linkInterns = document.querySelectorAll('a[href ^= "#"]')
console.log(linkInterns)

function handleLink(event){
    event.preventDefault();
    linkInterns.forEach((link) => {
        link.classList.remove('.active')
    })
    this.classList.add('.active')
}

linkInterns.forEach((link) => {
    link.addEventListener('click', handleLink)
})

// Selecione todos os elementos do site começando a partir do body,
// ao clique mostre exatamente quais elementos estão sendo clicados
const allElements = document.querySelectorAll('body *');

function viewElement(event){
  console.log(event.currentTarget)
}

allElements.forEach((element) => {
    element.addEventListener('click', viewElement)
})


// Utilizando o código anterior, ao invés de mostrar no console,
// remova o elemento que está sendo clicado, o método remove() remove um elemento


function removeElement(event){
   event.currentTarget.remove();
  }
  
  allElements.forEach((element) => {
      element.addEventListener('click', removeElement)
  })


// Se o usuário clicar na tecla (t), aumente todo o texto do site. 

function handleClickT(event){
    if(event.key === 't'){
        document.documentElement.classList.toggle('textMaior')
    }
}

window.addEventListener('keydown', handleClickT)