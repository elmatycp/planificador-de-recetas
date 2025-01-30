const listaIngredientes = document.querySelector('.lista-ingrediente'),
    fragment = document.createDocumentFragment()

document.addEventListener('DOMContentLoaded', (e)=>{
   
    const idReceta = localStorage.getItem('receta'),
     arrayLocalStorage = JSON.parse(localStorage.getItem('recetas'));

    let indiceReceta = arrayLocalStorage.findIndex(el => el.id === idReceta);
    const receta = arrayLocalStorage[indiceReceta]

    document.querySelector('.titulo-receta').textContent = receta.titulo;
    document.querySelector('.categoria-receta').textContent = receta.categoria;

    receta.ingredientes.forEach(el =>{
        const li = document.createElement('li');
        li.textContent = el

        fragment.appendChild(li)
    })

    listaIngredientes.appendChild(fragment)

    document.querySelector('.texto-descripcion').textContent = receta.descripcion;
})

document.addEventListener('click', e=>{
    if(e.target.matches('.btn-ver-recetas')){
        location.href = "libro-recetas.html"
    }
})