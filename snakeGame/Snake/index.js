import { getInputDirection } from './input.js'
import { gameboard } from '../Board/index.js';

// Velocidade da cobra
export const snakeSpeed = 4;

const snakeBody = [
    { x: 11, y: 11 },
]

export function update(){
    const inputDirection = getInputDirection();

    // fazer mover a cabeça
    snakeBody[0].x += inputDirection.x;
    snakeBody[0].y += inputDirection.y;
};

export function draw(){

    snakeBody.forEach(segment => {
    //criar o elemento 
    const snakeElement = document.createElement('div');

    //config css element
    snakeElement.classList.add('snake')

    // posição
    snakeElement.style.gridRowStart = segment.y;
    snakeElement.style.gridColumnStart = segment.x;

    //colocar no DOM
        gameboard.appendChild(snakeElement);
    })
};

export function collision(position){
    // O some vai retorna true se pelo menos uma das condições for positiva, mesmo havendo inumeras negativas.
    return snakeBody.some(segment => {
        // quando se a posição que eu receber do onbejto externo for igual 
        // o segmento que esta em loop tanto no x quanto no y, vai retorna  true, um está sobre o outro então colidiu(comeu a fruta).
        return position.x === segment.x && position.y === segment.y;
    })
}