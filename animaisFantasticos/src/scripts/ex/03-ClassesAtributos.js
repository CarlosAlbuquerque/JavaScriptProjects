// Adicione a classe ativo a todos os itens do menu
const itensMenu = document.querySelectorAll('.menu a');

itensMenu.forEach((item) => {
    item.classList.add('active')
})
console.log(itensMenu)

// Remove a classe ativo de todos os itens do menu e mantenha apenas no primeiro

itensMenu.forEach((item) => {
    item.classList.remove('active')
})

itensMenu[0].classList.add('active')

console.log(itensMenu)

// Verifique se a primeira imagem possui o atributo alt, se sim mostre no console se nao add
const img = document.querySelector('img');
if (img.getAttribute('alt')) {
    console.log(img);
} else {
    img.setAttribute('alt', 'Fox')
    console.log(img);
}


// Verifique se as imagens possuem o atributo alt
const possuiAlt = img.hasAttribute('alt');
console.log(possuiAlt)

// remova o alt da terceira img
const imgs = document.querySelectorAll('img');
imgs[2].removeAttribute('alt')
console.log(imgs[2])

// Modifique o href do link externo no menu

const link = document.querySelector('a[ href ^= "http"]');

link.setAttribute('href', 'https://learnjavascript.online/app.html')
console.log(link)