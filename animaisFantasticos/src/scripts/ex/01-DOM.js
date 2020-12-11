// Retorne no console todas as imagens do site
const img = document.querySelectorAll('img');
console.log(img)

// Retorne no console apenas as imagens que começaram com a palavra imagem
const imgAnimals = document.querySelectorAll('img[src^="img/imagem"]');
console.log(imgAnimals)

// Selecione todos os links internos (onde o href começa com #)
const href = document.querySelectorAll('a[href^="#"]');
console.log(href)
// Selecione o primeiro h2 dentro de .descriptionAnimals
const firsth2 = document.querySelector('.descriptionAnimals h2')
console.log(firsth2);

// Selecione o último p do site
const lastp = document.querySelectorAll('p');
console.log(lastp[lastp.length - 1])