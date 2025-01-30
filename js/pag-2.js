const d = document;

const categorias = d.querySelectorAll('.categoria'),
 contenedorCrads = d.querySelector('.contenedor-cards');

const buscador = d.querySelector('#input-buscador'),
 btnLimpiarBuscador = d.querySelector('.btn-limpiar-buscador');

const templateIngrediente = d.querySelector('#template-ingrediente').content,
 contenedorIngredientes = d.querySelector('.contenedor-ingredientes'),
 fragmentIngredientes = d.createDocumentFragment()

const seccionEditar = d.querySelector('.seccion-editar');

d.addEventListener('DOMContentLoaded', (e)=>{
    //le agrega la clase "seleccionada" a boton todo
    d.querySelector('button[data-categoria="todo"]').classList.add('seleccionada')
})

d.addEventListener('click', (e) =>{
    if(e.target.matches('.categoria')){

        let btnSeleccionadoActual;
        let btnSeleccionadoNuevo = e.target.dataset.categoria

        let categoriasCards = d.querySelectorAll('.categoria-card')
        
        categorias.forEach(el =>{
            if(el.classList.contains('seleccionada')){
                btnSeleccionadoActual = el
            }
        })

        btnSeleccionadoActual.classList.remove('seleccionada')
        e.target.classList.add('seleccionada')

        if(e.target.dataset.categoria === 'todo'){
            categoriasCards.forEach(el =>{
                el.closest('figure').classList.remove('ocultar');
            })

            return
        }

        categoriasCards.forEach(el =>{
            if(el.dataset.cardcategoria === btnSeleccionadoNuevo){
                if(el.closest('figure').classList.contains('ocultar')) el.closest('figure').classList.remove('ocultar')
            }else{

                if(el.closest('figure').classList.contains('ocultar')) return
                el.closest('figure').classList.add('ocultar')
            }
        })  
    }

    if(e.target.matches('.btn-buscar-receta')){
        const buscadorValue = buscador.value.toLowerCase()
        console.log(buscadorValue)

        if(buscadorValue === '') return

        let titulosCards = d.querySelectorAll('.titulo-card');
        titulosCards.forEach(el =>{
            if(buscadorValue === el.textContent.toLowerCase()){
                if(el.closest('figure').classList.contains('ocultar')) el.closest('figure').classList.remove('ocultar');
            }else{
                if(el.closest('figure').classList.contains('ocultar')) return;
                el.closest('figure').classList.add('ocultar');
            }
        })
    }

    if(e.target.matches('.btn-limpiar-buscador')){
        let categoriasCards = d.querySelectorAll('.categoria-card')
        let btnSeleccionadoActual

        categorias.forEach(el =>{
            if(el.classList.contains('seleccionada')){
                btnSeleccionadoActual = el
            }
        })

        btnSeleccionadoActual.classList.remove('seleccionada');
        d.querySelector('[data-categoria="todo"]').classList.add('seleccionada')

        categoriasCards.forEach(el =>{
            el.closest('figure').classList.remove('ocultar');
        })

        buscador.value = '';
    }

    if(e.target.matches('.btn-eliminar-receta')){
        d.querySelector('.seccion-eliminar').classList.toggle('mostrar')
        d.querySelector('.receta-seccion-eliminar').textContent = e.target.dataset.titulo
        d.querySelector('.btn-eliminar').dataset.id = e.target.dataset.id
        console.log(e.target.dataset.titulo)
    }

    if(e.target.matches('.btn-cancelar')){
        d.querySelector('.seccion-eliminar').classList.toggle('mostrar')
    }

    if(e.target.matches('.btn-eliminar')){
        let ArrayLocalStorage = JSON.parse(localStorage.getItem('recetas'));

        let recetaIndice = ArrayLocalStorage.findIndex((elemento)=> elemento.id === e.target.dataset.id)
        ArrayLocalStorage.splice(recetaIndice, 1)
        localStorage.setItem('recetas', JSON.stringify(ArrayLocalStorage))

        let contenedorReceta = d.querySelector(`[data-id="${e.target.dataset.id}"]`).closest('figure')
        contenedorCrads.removeChild(contenedorReceta)

        d.querySelector('.notificacion-eliminado').classList.add('mostrar');
        setTimeout(() => {
            d.querySelector('.notificacion-eliminado').classList.remove('mostrar');
            d.querySelector('.notificacion-eliminado').classList.add('ocultar');

            setTimeout(() => {
                d.querySelector('.notificacion-eliminado').classList.remove('ocultar');
            }, 2500);
        }, 2000);

        d.querySelector('.seccion-eliminar').classList.toggle('mostrar');
    }

    if(e.target.matches('.btn-editar-receta')){
        d.querySelector('.seccion-editar').classList.toggle('mostrar');
        d.querySelector('.contenedor-seccion-editar').classList.add('mostrarEditar');
        d.querySelector('.contenedor-cards').classList.toggle('ocultar');

        window.scro

        let arraylocalStorage = JSON.parse(localStorage.getItem('recetas'));
        let indiceReceta = arraylocalStorage.findIndex(el => el.id === e.target.dataset.id)

        let receta = arraylocalStorage[indiceReceta]
        
        d.querySelector('.input-titulo').value = receta.titulo
        d.querySelector('.input-categoria').value = receta.categoria
        d.querySelector('.textarea-descripcion').value = receta.descripcion
        d.querySelector('.input-tiempo').value = receta.tiempo
        d.querySelector('.btn-guardar-editar').dataset.id = e.target.dataset.id

        let arrayIngredientes = receta.ingredientes;
        arrayIngredientes.forEach(el => {
            templateIngrediente.querySelector('.texto-ingrediente').textContent = el;
            templateIngrediente.querySelector('.btn-eliminar-receta-editar').dataset.receta = el;

            let clone = d.importNode(templateIngrediente, true)
            fragmentIngredientes.appendChild(clone)
        })

        contenedorIngredientes.appendChild(fragmentIngredientes);
        window.scrollTo(0, 0)
    }

    if(e.target.matches('.btn-agregar-ingrediente')){
        e.preventDefault()
        const inputAgregarValue = d.querySelector('.input-agregar-editar').value;

        if(inputAgregarValue === '') return

        templateIngrediente.querySelector('.texto-ingrediente').textContent = inputAgregarValue;
        templateIngrediente.querySelector('.btn-eliminar-receta-editar').dataset.receta = inputAgregarValue;

        let clone = d.importNode(templateIngrediente, true);
        contenedorIngredientes.appendChild(clone);

        d.querySelector('.input-agregar-editar').value = ''
    }

    if(e.target.matches('.btn-eliminar-receta-editar')){
        e.preventDefault();
        let ingredienteEliminar = e.target.closest('article');
        contenedorIngredientes.removeChild(ingredienteEliminar);
    }

    if(e.target.matches('.btn-cancelar-editar')){
        e.preventDefault()
        d.querySelector('.seccion-editar').classList.toggle('mostrar');
        d.querySelector('.contenedor-cards').classList.toggle('ocultar');

        let contadorIngredientes = d.querySelector('.contenedor-ingredientes').childElementCount,
         contenedorIngredientes = d.querySelector('.contenedor-ingredientes');
        

        while (contadorIngredientes >= 1){
            contenedorIngredientes.removeChild(contenedorIngredientes.children[contadorIngredientes-1])
            contadorIngredientes = contadorIngredientes - 1;
        }
    }

    if(e.target.matches('.btn-guardar-editar')){
        e.preventDefault()
        const tituloValue = d.querySelector('.input-titulo').value,
         categoriaValue = d.querySelector('.input-categoria').value,
         descripcionValue = d.querySelector('.textarea-descripcion').value,
         tiempoValue = d.querySelector('.input-tiempo').value;

        const contenedorIngredientes = d.querySelector('.contenedor-ingrediente'),
         ingredientesValue = d.querySelectorAll('.texto-ingrediente');

        const arrayIngredientes = new Array();

        if(tiempoValue === '') return;

        ingredientesValue.forEach(el => {
            arrayIngredientes.push(el.textContent)
        });


        // LocalStorage
        let arraylocalStorage = JSON.parse(localStorage.getItem('recetas'));
    
        const indiceReceta = arraylocalStorage.findIndex(el => el.id === e.target.dataset.id)
        arraylocalStorage[indiceReceta].titulo = tituloValue;
        arraylocalStorage[indiceReceta].categoria = categoriaValue;
        arraylocalStorage[indiceReceta].descripcion = descripcionValue;
        arraylocalStorage[indiceReceta].tiempo = tiempoValue;
        arraylocalStorage[indiceReceta].ingredientes = arrayIngredientes;
        
        localStorage.setItem('recetas', JSON.stringify(arraylocalStorage));

        // Vista libro de receta
        const receta = d.querySelector(`[data-id="${e.target.dataset.id}"]`).closest('figure');
        
        receta.querySelector('.titulo-card').textContent = tituloValue;
        receta.querySelector('.categoria-card').textContent = categoriaValue;
        receta.querySelector('.tiempo-card').textContent = tiempoValue;
        receta.querySelector('.descripcion-card').textContent = descripcionValue;

        let contadorIngredientes = d.querySelector('.contenedor-ingredientes').childElementCount,
         contenedorIngredientesTotal = d.querySelector('.contenedor-ingredientes');
        console.log(contadorIngredientes);

        while (contadorIngredientes >= 1){
            contenedorIngredientesTotal.removeChild(contenedorIngredientesTotal.children[contadorIngredientes-1])
            contadorIngredientes = contadorIngredientes - 1;
        }
        d.querySelector('.contenedor-cards').classList.toggle('ocultar');

        d.querySelector('.seccion-editar').classList.toggle('mostrar');
       
    }

    if(e.target.matches('.btn-ver-receta')){
        e.preventDefault()
        location.href = "receta.html"
        localStorage.setItem('receta', `${e.target.dataset.id}`)
    }
})

buscador.addEventListener('focus', (e)=>{
    btnLimpiarBuscador.classList.add('mostrar')
})

buscador.addEventListener('focusout', (e)=>{
    btnLimpiarBuscador.classList.remove('mostrar')
})


window.addEventListener('scroll', (e)=>{
    if(e.target === seccionEditar){
        console.log('sajdnj')
    }
})