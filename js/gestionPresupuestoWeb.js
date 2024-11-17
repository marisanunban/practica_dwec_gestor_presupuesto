import * as gesPres from './gestionPresupuesto.js'

document.getElementById("actualizarpresupuesto").addEventListener("click", actualizarPresupuestoWeb);
document.getElementById("anyadirgasto").addEventListener("click", nuevoGastoWeb);

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


    let handBorrar = new EditarHandle(gasto);
    let botonBorrar = document.createElement("button");
    botonBorrar.addEventListener("click",handBorrar);
    botonBorrar.classList.add("gasto-borrar");
    botonBorrar.innerHTML="Borrar";
    botonBorrar.type="button";
    gastoDiv.appendChild(botonBorrar);
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
    introducirPresupuesto = parseInt(introducirPresupuesto);
    gesPres.actualizarPresupuesto(introducirPresupuesto);

    repintar();
}

function nuevoGastoWeb(){
    let descripcion=prompt("Introduce una descripcion");
    let valor = parseInt(prompt("Introduce el valor"));
    let fecha = prompt("Introduce la fecha en formato (aaaa/mm/dd)");
    let etiquetas = prompt('Introduce etiquetas separadas por coma').split(',');
    
    //console.log(descripcion,valor,fecha,...etiquetas)
    let gasto=gesPres.CrearGasto(descripcion,valor,fecha,...etiquetas);
    gesPres.anyadirGasto(gasto)

    repintar()
}


function EditarHandle(gasto){

    this.handleEvent = handleEventFunction;

    function handleEventFunction(event) {
    let descripcion=prompt("Introduce una descripcion",gasto.descripcion);
    let valor = parseInt(prompt("Introduce el valor",gasto.valor));
    let fecha = prompt("Introduce la fecha en formato (aaaa/mm/dd)",gasto.fecha);
    let etiquetas = prompt('Introduce etiquetas separadas por coma',gasto.mostrarEtiquetas()).split(',');

    gasto.actualizarDescripcion(descripcion)
    gasto.actualizarValor(valor)
    gasto.actualizarFecha(fecha)
    gasto.borrarEtiquetasCompleta()
    gasto.anyadirEtiquetas(...etiquetas)

    repintar();
    }
}
function BorrarHandle(gasto){
    this.handleEvent = handleEventFunction;

    function handleEventFunction(event) {
    gesPres.borrarGasto(gasto.id)
    repintar();
    }
}

function BorrarEtiquetasHandle(gasto,etiqueta){
    this.handleEvent = handleEventFunction;

    function handleEventFunction(event) {
        gasto.borrarEtiquetas(etiqueta)
        repintar();
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
    BorrarEtiquetasHandle
}