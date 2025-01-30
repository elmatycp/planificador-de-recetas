const d = document, w = window, ls = localStorage;

const btnCrearReceta = d.querySelector('#btn-crear-receta'),
 btnLibroReceta = d.querySelector('#btn-libro-recetas'),
 contenedorModal = d.querySelector('.contenedor-modal');

// Variables de formulario
const inputTitulo = d.getElementById('input-titulo'),
 inputCategoria = d.getElementById('select-categoria'),
 inputIngredientes = d.getElementById('input-ingredientes'),
 btnAgregarIngrediente = d.getElementById('btn-agregar-ingrediente'),
 inputTextarea = d.getElementById('input-textarea'),
 inputTiempo = d.getElementById('input-tiempo'),
 btnGuardarFormulario = d.querySelector('.btn-guardar-formulario'),
 btnCerrarModal = d.querySelector('.btn-cancelar-formulario'),
 formulario = d.querySelector('.formulario');

const regExp = /[A-Za-zÁÉÍÓÚáéíóúÑñ0-9 ]+$/

class receta {
    constructor(titulo, categoria, ingredientes, descripcion, tiempo, id){
        this.titulo = titulo;
        this.categoria = categoria;
        this.ingredientes = ingredientes;
        this.descripcion = descripcion;
        this.tiempo = tiempo
        this.id = id
    }
}

let ingredientes = []

function generarIdAleatorio(longitud = 10) {
    const caracteres = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let id = '';
    for (let i = 0; i < longitud; i++) {
        const indiceAleatorio = Math.floor(Math.random() * caracteres.length);
        id += caracteres[indiceAleatorio];
    }
    return id;
}

d.addEventListener('DOMContentLoaded', (e)=>{
    if(ls.getItem('recetas') === null){
        ls.setItem('recetas', JSON.stringify([]))
    }
})

d.addEventListener('click', (e)=>{
    if(e.target === btnLibroReceta){
        w.location.href = 'libro-recetas.html';
    }

    if(e.target === btnCrearReceta){
        contenedorModal.classList.toggle('mostrar');
        d.querySelector('.ventana-modal').classList.add('mostrar-animacion');
    }

    if(e.target === btnCerrarModal){
        e.preventDefault();
        contenedorModal.classList.toggle('mostrar');
        d.querySelector('.ventana-modal').classList.remove('mostrar-animacion');
        formulario.reset();
    }

    if(e.target === btnAgregarIngrediente){
        e.preventDefault();
        let valorInput = inputIngredientes.value
        if(valorInput === '') return
        ingredientes.push(valorInput);
        inputIngredientes.value = '';

    }

    if(e.target === btnGuardarFormulario){
        e.preventDefault()
        if(!regExp.test(inputTitulo.value)) return
        contenedorModal.classList.toggle('mostrar');
        d.querySelector('.ventana-modal').classList.remove('mostrar-animacion');
        
        const recetasLocalStorage = JSON.parse(ls.getItem('recetas'))
        recetasLocalStorage.push(new receta(inputTitulo.value, inputCategoria.value, ingredientes, inputTextarea.value, inputTiempo.value, generarIdAleatorio(7)))
        ls.setItem('recetas', JSON.stringify(recetasLocalStorage))
        ingredientes = [];

        formulario.reset();

        d.querySelector('.notificacion-de-creacion').classList.add('mostrar');
        setTimeout(() => {
            d.querySelector('.notificacion-de-creacion').classList.remove('mostrar');
            d.querySelector('.notificacion-de-creacion').classList.add('ocultar');

            setTimeout(() => {
                d.querySelector('.notificacion-de-creacion').classList.remove('ocultar');
            }, 2500);
        }, 2000);
    }
})
