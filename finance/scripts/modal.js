const active = document.querySelector(".modal-overlay");

const modal = {
    open(){
        // Abrir modal
        // Adcionar classe active do modal
        active.classList.add('active');
},
    close(){
        // Fechar modal
        // Retirar classe active do modal
        active.classList.remove('active');
}
}