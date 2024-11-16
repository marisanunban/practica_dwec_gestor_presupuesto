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
        let spanEtiqueta = document.createElement("span");
        spanEtiqueta.classList.add("gasto-etiquetas-etiqueta")
        spanEtiqueta.innerHTML = `${etiq} `
        gastoEtiquetas.appendChild(spanEtiqueta)
    }
    gastoDiv.appendChild(gastoEtiquetas)
    
    let elemento = document.getElementById(idElemento);
        elemento.appendChild(gastoDiv)
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
     let elemento = document.getElementById(idElemento)
        elemento.append(divAgrupacion)
}


export{
    mostrarDatoEnId,
    mostrarGastoWeb,
    mostrarGastosAgrupadosWeb
}