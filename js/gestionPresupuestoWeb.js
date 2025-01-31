import * as gesPres from './gestionPresupuesto.js'

document.getElementById("actualizarpresupuesto").addEventListener("click", actualizarPresupuestoWeb);
document.getElementById("anyadirgasto").addEventListener("click", nuevoGastoWeb);
document.getElementById("anyadirgasto-formulario").addEventListener("click", nuevoGastoWebFormulario);
document.getElementById("guardar-gastos").addEventListener("click", guardarGastosWeb);
document.getElementById("cargar-gastos").addEventListener("click", cargarGastosWeb);
document.getElementById("formulario-filtrado").addEventListener("submit", filtrarGastosWeb);
document.getElementById("cargar-gastos-api").addEventListener("click", cargarGastosApi);

let urlApi =  "https://suhhtqjccd.execute-api.eu-west-1.amazonaws.com/latest/"

function mostrarDatoEnId(valor, idElemento){
    let idRecogida = document.getElementById(idElemento);
    idRecogida.innerHTML = valor;

}


function mostrarGastoWeb(idElemento, gasto){
    let gastoDiv = document.createElement("div");
    gastoDiv.classList.add("gasto")

    let gastoDescripcion = document.createElement("div");
    gastoDescripcion.classList.add("gasto-descripcion");
    gastoDescripcion.innerHTML=`${gasto.descripcion}`;
    gastoDiv.appendChild(gastoDescripcion)
    
    let gastoFecha = document.createElement("div");
    gastoFecha.classList.add("gasto-fecha");
    gastoFecha.innerHTML=`${gasto.fecha}`;
    gastoDiv.appendChild(gastoFecha)

    let gastoValor = document.createElement("div");
    gastoValor.classList.add("gasto-valor");
    gastoValor.innerHTML=`${gasto.valor}`;
    gastoDiv.appendChild(gastoValor)

    let gastoEtiquetas = document.createElement("div");
    gastoEtiquetas.classList.add("gasto-etiquetas");
    for (const etiq of gasto.etiquetas) {
        let handBorrarEtiqueta= new BorrarEtiquetasHandle(gasto,etiq)
        let spanEtiqueta = document.createElement("span");
        spanEtiqueta.addEventListener("click",handBorrarEtiqueta);
        spanEtiqueta.classList.add("gasto-etiquetas-etiqueta");
        spanEtiqueta.innerHTML = `${etiq} `;
        gastoEtiquetas.appendChild(spanEtiqueta);
    }
    gastoDiv.appendChild(gastoEtiquetas);
    
    let elemento = document.getElementById(idElemento);
    elemento.appendChild(gastoDiv);


    let handEditar = new EditarHandle(gasto);
    let botonEditar = document.createElement("button");
    botonEditar.addEventListener("click",handEditar);
    botonEditar.classList.add("gasto-editar");
    botonEditar.innerHTML="Editar";
    botonEditar.type="button";
    gastoDiv.appendChild(botonEditar);


    let handBorrar = new BorrarHandle(gasto);
    let botonBorrar = document.createElement("button");
    botonBorrar.addEventListener("click",handBorrar);
    botonBorrar.classList.add("gasto-borrar");
    botonBorrar.innerHTML="Borrar";
    botonBorrar.type="button";
    gastoDiv.appendChild(botonBorrar);

    let handBorrarApi = new BorrarHandleApi(gasto);
    let botonBorrarApi = document.createElement("button");
    botonBorrarApi.addEventListener("click",handBorrarApi);
    botonBorrarApi.classList.add("gasto-borrar-api");
    botonBorrarApi.innerHTML="Borrar (Api)";
    botonBorrarApi.type="button";
    gastoDiv.appendChild(botonBorrarApi);

    let editarHandleFormulario = new EditarHandleformulario(gasto);
    let botonEditarForm = document.createElement("button");
    botonEditarForm.addEventListener("click",editarHandleFormulario);
    botonEditarForm.classList.add("gasto-editar-formulario");
    botonEditarForm.innerHTML="Editar (formulario)";
    botonEditarForm.type="button";
    gastoDiv.appendChild(botonEditarForm);
}

function mostrarGastosAgrupadosWeb(idElemento, agrup, periodo){
const divAgrupacion = document.createElement("div");
  divAgrupacion.classList.add("agrupacion");

  const tituloDiv = document.createElement("h1");
  tituloDiv.innerHTML = `Gastos agrupados por ${periodo}`;
  divAgrupacion.append(tituloDiv);

  for (const [fecha, value] of Object.entries(agrup)) {
    let divAgrupacionDato = document.createElement("div");
    divAgrupacionDato.classList.add("agrupacion-dato");

    let divAgrupacionClave = document.createElement("span");
    divAgrupacionClave.classList.add("agrupacion-dato-clave");
    divAgrupacionClave.innerHTML = fecha;
    divAgrupacionDato.appendChild(divAgrupacionClave);

    let divAgrupacionValor = document.createElement("span");
    divAgrupacionValor.classList.add("agrupacion-dato-valor");
    divAgrupacionValor.innerHTML = value;
    divAgrupacionDato.appendChild(divAgrupacionValor);

    divAgrupacion.appendChild(divAgrupacionDato);
  }
    let elemento = document.getElementById(idElemento);
    elemento.append(divAgrupacion);
}
function eventoCancelar(boton){
    this.handleEvent = function(event) {
        let formulario = event.currentTarget.closest('form');
    
        boton.disabled = false;
    
        formulario.remove();
      };
}
function repintar(){
    mostrarDatoEnId(gesPres.mostrarPresupuesto(), "presupuesto");
    mostrarDatoEnId(gesPres.calcularTotalGastos(), "gastos-totales");
    mostrarDatoEnId(gesPres.calcularBalance(),"balance-total");
    document.getElementById("listado-gastos-completo").innerHTML = "";

    for (let gasto of gesPres.listarGastos()) {
        
        mostrarGastoWeb("listado-gastos-completo", gasto);

    }
}


function actualizarPresupuestoWeb(){
    let introducirPresupuesto = prompt ("Introduzca un presupuesto");
    introducirPresupuesto = parseFloat(introducirPresupuesto);
    gesPres.actualizarPresupuesto(introducirPresupuesto);

    repintar();
}

function nuevoGastoWeb(){
    let descripcion=prompt("Introduce una descripcion");
    let valor = parseFloat(prompt("Introduce el valor"));
    let fecha = prompt("Introduce la fecha en formato (aaaa/mm/dd)");
    let etiquetas = prompt('Introduce etiquetas separadas por coma').split(',');
    
    //console.log(descripcion,valor,fecha,...etiquetas)
    let gasto = new gesPres.CrearGasto(descripcion,valor,fecha,...etiquetas);
    gesPres.anyadirGasto(gasto)

    repintar()
}
function nuevoGastoWebFormulario(){
    let plantillaFormulario = document.getElementById("formulario-template").content.cloneNode(true);

    let botonAnyadirFormulario = document.getElementById('anyadirgasto-formulario')
    botonAnyadirFormulario.disabled = true;

    var formulario = plantillaFormulario.querySelector("form");

    formulario.addEventListener("submit", function(event){
        event.preventDefault();

        let formu = event.currentTarget;

        let descriForm = formu.elements.descripcion.value;
        let valorForm = parseFloat(formu.elements.valor.value);
        let fechaForm = formu.elements.fecha.value;
        let etiquetForm = formu.elements.etiquetas.value.split(',');

        let gasto = new gesPres.CrearGasto(descriForm, valorForm, fechaForm, ...etiquetForm);
        gesPres.anyadirGasto(gasto);

        repintar();
        botonAnyadirFormulario.disabled = false
    })
    formulario.querySelector("button.gasto-enviar-api").addEventListener('click', subirGastosApi);
    formulario.querySelector("button.cancelar").addEventListener('click', new eventoCancelar(botonAnyadirFormulario));
    document.getElementById("controlesprincipales").appendChild(plantillaFormulario);

}


function EditarHandle(gasto){

    this.handleEvent = handleEventFunction;

    function handleEventFunction(event) {
    let descripcion = prompt("Introduce una descripcion",gasto.descripcion);
    let valor = parseFloat(prompt("Introduce el valor",gasto.valor));
    let fecha = prompt("Introduce la fecha en formato (aaaa-mm-dd)",gasto.fecha);
    let etiquetas = prompt('Introduce etiquetas separadas por coma',gasto.mostrarEtiquetas()).split(',');

    gasto.actualizarDescripcion(descripcion)
    gasto.actualizarValor(valor)
    gasto.actualizarFecha(fecha)
    gasto.borrarEtiquetasCompleta()
    gasto.anyadirEtiquetas(...etiquetas)

    repintar();
    }
}
function EditarHandleformulario(gasto){
    this.handleEvent = handleEventFunction;
    function handleEventFunction(event){
    let plantillaFormulario = document.getElementById("formulario-template").content.cloneNode(true);

    var formulario = plantillaFormulario.querySelector("form");
    
    formulario.elements.descripcion.value = gasto.descripcion;
    formulario.elements.valor.value = parseFloat(gasto.valor);
    formulario.elements.fecha.valueAsDate = new Date(gasto.fecha);
    for(let etiquet of gasto.etiquetas){
    formulario.elements.etiquetas.value = `${etiquet} ,`
    }
    
    let botonEditarFormulario = event.currentTarget.closest(".gasto-editar-formulario");
    console.log(botonEditarFormulario)
    botonEditarFormulario.disabled = true;
    
    botonEditarFormulario.after(plantillaFormulario)

  
    formulario.addEventListener("submit", function(event){
        event.preventDefault();
        let formu = event.currentTarget;

        let descriForm = formu.elements.descripcion.value;
        let valorForm = parseFloat(formu.elements.valor.value);
        let fechaForm = formu.elements.fecha.value;
        let etiquetForm = formu.elements.etiquetas.value.split(',');

        gasto.actualizarDescripcion(descriForm);
        gasto.actualizarValor(valorForm);
        gasto.actualizarFecha(fechaForm);
        gasto.borrarEtiquetas();
        gasto.anyadirEtiquetas(...etiquetForm);

        repintar();
    })
    
    formulario.querySelector("button.cancelar").addEventListener('click', new eventoCancelar(botonEditarFormulario));
    formulario.querySelector("button.gasto-enviar-api").addEventListener('click', actualizarGastosApi.bind(gasto));
    document.getElementById("controlesprincipales").appendChild(plantillaFormulario);

    }

}
function BorrarHandle(gasto){
    this.handleEvent = handleEventFunction;

    function handleEventFunction(event) {
    gesPres.borrarGasto(gasto.id)
    repintar();
    }
}
function BorrarHandleApi(gasto){
    this.handleEvent = async (evento) =>{
        let usuario = document.getElementById("nombre-usuario").value;
        let respuesta = await fetch (urlApi + usuario + "/" + gasto.gastoId,{
            method: 'DELETE'

        })
        if(respuesta.ok){
            cargarGastosApi();
        }
        else{
            console.log ("error");
        }
    }
    
}

function BorrarEtiquetasHandle(gasto,etiqueta){
    this.handleEvent = handleEventFunction;

    function handleEventFunction(event) {
        gasto.borrarEtiquetas(etiqueta)
        repintar();
    }
}

function guardarGastosWeb(){
     localStorage.setItem("GestorGastosDWEC", JSON.stringify(gesPres.listarGastos()));
}
function cargarGastosWeb(){
    var arrayGastos = [];

    if(localStorage.getItem("GestorGastosDWEC")){
        arrayGastos = JSON.parse(localStorage.getItem("GestorGastosDWEC"));
        gesPres.cargarGastos(arrayGastos);  
    }
    else{
        gesPres.cargarGastos(arrayGastos);
    }
    repintar();
}

function filtrarGastosWeb (event) {
    event.preventDefault()

    let form = event.target;
  
    let descripcionContiene = form.elements['formulario-filtrado-descripcion'].value;
    let valorMinimo = form.elements['formulario-filtrado-valor-minimo'].value;
    let valorMaximo = form.elements['formulario-filtrado-valor-maximo'].value;
    let fechaDesde = form.elements['formulario-filtrado-fecha-desde'].value;
    let fechaHasta = form.elements['formulario-filtrado-fecha-hasta'].value;
    let etiquetasTiene = form.elements['formulario-filtrado-etiquetas-tiene'].value;
  
    let variableFiltro = {};
  
    if (descripcionContiene !== '')
         { 
            variableFiltro.descripcionContiene = descripcionContiene ;
            }
    if (valorMinimo !== '') 
        { 
            variableFiltro.valorMinimo = valorMinimo ;
        }
    if (valorMaximo !== '') 
        { 
            variableFiltro.valorMaximo = valorMaximo ;
        }
    if (fechaDesde !== '') 
        { 
            variableFiltro.fechaDesde = fechaDesde ;
        }
    if (fechaHasta !== '') 
        { 
            variableFiltro.fechaHasta = fechaHasta ;
        }
    if (etiquetasTiene !== '') 
        { 
            variableFiltro.etiquetasTiene = gesPres.transformarListadoEtiquetas(etiquetasTiene) ;
        }

    let gastosFiltrados = gesPres.filtrarGastos(variableFiltro);
  
    document.getElementById('listado-gastos-completo').innerHTML = '';
  
    for (let gasto of gastosFiltrados) {
      mostrarGastoWeb('listado-gastos-completo', gasto);
    }
  }

  async function cargarGastosApi(){
    let nombreUsuario = document.getElementById("nombre-usuario").value;
    let urlApiUsuario = urlApi + nombreUsuario;

    let respuesta = await fetch (urlApiUsuario);
    if (respuesta.ok){
        let conversionJson = await respuesta.json();
        gesPres.cargarGastos(conversionJson);
        repintar();
    }
    else{
        console.log("error");
    }
  }
  async function subirGastosApi(evento){
    let nombreUsuario = document.getElementById("nombre-usuario").value;
    let urlApiUsuario = urlApi + nombreUsuario;

    let formu = evento.target.closest('form')
    let descriForm = formu.elements.descripcion.value;
    let valorForm = parseFloat(formu.elements.valor.value);
    let fechaForm = formu.elements.fecha.value;
    let etiquetForm = formu.elements.etiquetas.value.split(',');

    let gastoNuevo = new gesPres.CrearGasto(descriForm,valorForm,fechaForm,...etiquetForm);
    let respuesta = await fetch(urlApiUsuario,{
        method: 'post',
        body:JSON.stringify(gastoNuevo),
        headers: {'Content-Type': 'application/json'}})
        
        if(respuesta.ok){
            cargarGastosApi()
        } 
        else{
            console.log("error");
        }
        
  }
  async function actualizarGastosApi(evento){
    let nombreUsuario = document.getElementById("nombre-usuario").value;
    let urlApiUsuario = urlApi + nombreUsuario + "/" + this.gastoId;

    let formu = evento.target.closest('form')

    console.log(formu)

        let descriForm = formu.elements.descripcion.value;
        let valorForm = parseFloat(formu.elements.valor.value);
        let fechaForm = formu.elements.fecha.value;
        let etiquetForm = formu.elements.etiquetas.value.split(',');

    let gastoNuevo = new gesPres.CrearGasto(descriForm,valorForm,fechaForm,...etiquetForm);
    let respuesta = await fetch(urlApiUsuario,{
        method: 'PUT',
        body:JSON.stringify(gastoNuevo),
        headers: {'Content-Type': 'application/json'}})
        
        if(respuesta.ok){
            cargarGastosApi()
        } 
        else{
            console.log("error");
        }
        
  }

export{
    mostrarDatoEnId,
    mostrarGastoWeb,
    mostrarGastosAgrupadosWeb,
    repintar,
    actualizarPresupuestoWeb,
    nuevoGastoWeb,
    EditarHandle,
    BorrarHandle,
    BorrarEtiquetasHandle,
    nuevoGastoWebFormulario,
    guardarGastosWeb,
    cargarGastosWeb,
    filtrarGastosWeb,
    cargarGastosApi,
    subirGastosApi

}