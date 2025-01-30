const ls = localStorage;

const seccionCards = document.querySelector('#contenedor-cards'),
 templateCard = document.querySelector('#template-card').content,
 fragment = document.createDocumentFragment();

document.addEventListener('DOMContentLoaded', (e)=>{
    const arrayLocalStorage = JSON.parse(ls.getItem('recetas'))
    
    arrayLocalStorage.forEach(el => {
        templateCard.querySelector('.titulo-card').textContent = el.titulo;
        templateCard.querySelector('.btn-ver-receta').dataset.id = el.id;
        templateCard.querySelector('.categoria-card').dataset.cardcategoria = el.categoria;
        templateCard.querySelector('.categoria-card').textContent = el.categoria;
        templateCard.querySelector('.tiempo-card').textContent = el.tiempo;
        templateCard.querySelector('.descripcion-card').textContent = el.descripcion;
        templateCard.querySelector('.btn-eliminar-receta').dataset.titulo = el.titulo;
        templateCard.querySelector('.btn-eliminar-receta').dataset.id = el.id;
        templateCard.querySelector('.btn-editar-receta').dataset.id = el.id;

        let clone = document.importNode(templateCard, true);
        fragment.appendChild(clone)
    });

    seccionCards.appendChild(fragment);
});