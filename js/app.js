//variables de tipo const 
const carrito = document.querySelector('#carrito');
const contenedorCarrito = document.querySelector('#lista-carrito tbody');
const listaCursos = document.querySelector('#lista-cursos');
const vaciarCarritoBtn = document.querySelector('#vaciar-carrito');
let enCarrito = document.querySelector('#enCarrito');
let totalCompra = document.querySelector('#total');
let articulosCarrito = [];
let cad;

//listener y métodos(funciones)
cargarEventListener();
function cargarEventListener(){
    //cuando se hace click sobre el botón "Agregar Al Carrito" agregamos
    //un curso
    listaCursos.addEventListener('click',agregarCurso);
    //cargar cursos del localStorage
    document.addEventListener('DOMContentLoaded',() => {
      articulosCarrito = JSON.parse(localStorage.getItem('carrito')) || [];
      carritoHTML();
      actualizarCantidadCarrito();
    });

    //escucha para ejecutar un evento para eliminar un elemento del carrito
    carrito.addEventListener('click',eliminarCurso);
    vaciarCarritoBtn.addEventListener('click', ()=>{
        articulosCarrito = []; //reseteamos el arreglo de carrito
        carritoHTML();
    })
}
//función para eliminar un curso
function sincronizarStorage() {
  localStorage.setItem('carrito', JSON.stringify(articulosCarrito));
}

function eliminarCurso(e){
    e.preventDefault();
    if(e.target.classList.contains('borrar-curso')){
      const cursoId = e.target.getAttribute('data-id');
      
    console.log(cursoId);
      //elimina del arreglo articulosCarrito de acuerdo al data-id
      articulosCarrito = articulosCarrito.filter( curso => curso.id  !== cursoId); 
    }
    actualizarCantidadCarrito();
    carritoHTML(); 
}
 

//funciones
function agregarCurso(e){
    e.preventDefault();
    if(e.target.classList.contains('agregar-carrito')){
        const cursoSeleccionado = e.target.parentElement.parentElement;
        leerDatosCurso(cursoSeleccionado);
    }
}
function actualizarCantidadCarrito(){
    cad="";
    cad = cad.concat('(',articulosCarrito.length,')');
    enCarrito.innerHTML = cad;
    let total=0;
    articulosCarrito.forEach(element => {
        total += Number(element.precio)*Number(element.cantidad);        
    });
   totalCompra.innerHTML = '$'+total;
}
//lee el contenido del HTML del card que le dimos click y extraemos la información del curso
function leerDatosCurso(cursoSeleccionado){
   const infoCurso = {
       imagen: cursoSeleccionado.querySelector('img').src,
       titulo: cursoSeleccionado.querySelector('h4').textContent,
       precio: cursoSeleccionado.querySelector('.precio span span').textContent,
       id: cursoSeleccionado.querySelector('a').getAttribute('data-id'),
       cantidad: 1
   }
    //revisar si un elemento ya existe en el carrito.
    const existe = articulosCarrito.some(curso => curso.id === infoCurso.id); 
    if (existe){
        //actualizar la cantidad del artículo que se encuentra en el carrito
      const cursos = articulosCarrito.map( curso => {
           if(curso.id === infoCurso.id){
            curso.cantidad++;
            return curso; //retorna el objeto actualizado
           }
           else{
            return curso; //retorna los objetos que no están duplicados
           }
      });
      articulosCarrito = [...cursos];
    }
      else{
        articulosCarrito = [...articulosCarrito, infoCurso];    
    }
    actualizarCantidadCarrito();
    carritoHTML();
}

function carritoHTML(){
    limpiarHTML();
    articulosCarrito.forEach(curso =>{
      const {imagen, titulo, precio, cantidad, total=precio*cantidad,id} = curso;
      const row = document.createElement('tr');
      row.innerHTML = `
        <td>
          <img src="${imagen}" width="100">
        </td>
        <td>${titulo}</td>
        <td>$${precio}</td>
        <td>${cantidad}</td>
        <td>$${total}</td>
        <td>
        <a href="#" class="borrar-curso" data-id="${id}">X</a>
        </td>
    `;
    contenedorCarrito.appendChild(row);
    });
    //agregar carrito de compras al storage
    sincronizarStorage();
}
function sincronizarStorage() {
  localStorage.setItem('carrito', JSON.stringify(articulosCarrito));
}
function limpiarHTML(){
    while(contenedorCarrito.firstChild){
        contenedorCarrito.removeChild(contenedorCarrito.firstChild)
    }
}

