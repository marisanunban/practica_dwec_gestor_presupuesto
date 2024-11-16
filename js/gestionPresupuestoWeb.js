function mostrarDatoEnId(valor, idElemento){
    let idRecogida = document.getElementById(idElemento);
    idRecogida.innerHTML = valor;

}


function mostrarDatoWeb(idElemento, gasto){
    let gastoDiv = document.createElement("div");
    gastoDiv.classList.add("gasto")

    let gastoDescripcion = document.createElement("div");
    gastoDescripcion.classList.add("gasto-decripcion");
    gastoDescripcion.innerText=`${gasto.descripcion}`;
    gastoDiv.appendChild(gastoDescripcion)
    
    let gastoFecha = document.createElement("div");
    gastoFecha.classList.add("gasto-fecha");
    gastoFecha.innerText=`${gasto.fecha}`;
    gastoDiv.appendChild(gastoFecha)

    let gastoValor = document.createElement("div");
    gastoValor.classList.add("gasto-valor");
    gastoValor.innerText=`${gasto.valor}`;
    gastoDiv.appendChild(gastoValor)

    let gastoEtiquetas = document.createElement("div");
    gastoEtiquetas.classList.add("gasto-etiquetas");
    for (const etiq of gasto.etiqueta) {
        let spanEtiqueta = document.createElement("span");
        spanEtiqueta.classList.add("gasto-etiquetas-etiqueta")
        spanEtiqueta.innerText = etiq
        gastoEtiquetas.appendChild(spanEtiqueta)
    }
    gastoDiv.appendChild(gastoEtiquetas)
    
    let elemento = document.getElementById(idElemento);
        elemento.appendChild(gastoDiv)
}

function mostrarGastosAgrupadosWeb(idElemento, agrup, periodo){
const divAgrupacion = document.createElement("div");
  divAgrupacion.classList.add("agrupacion");

  const tituloDiv = document.createElement('h1');
  tituloDiv.innerText = `Gastos agrupados por ${periodo}`;
  divAgrupacion.append(tituloDiv);

  for (const [fecha, value] of Object.entries(agrup)) {
    let divAgrupacionDato = document.createElement('div');
    divAgrupacionDato.classList.add('agrupacion-dato');

    let divAgrupacionClave = document.createElement('span');
    divAgrupacionClave.classList.add('agrupacion-dato-clave');
    divAgrupacionClave.innerText = fecha;
    divAgrupacionDato.appendChild(divAgrupacionClave);

    let divAgrupacionValor = document.createElement('span');
    divAgrupacionValor.classList.add('agrupacion-dato-valor');
    divAgrupacionValor.innerText = value;
    divAgrupacionDato.appendChild(divAgrupacionValor);

    divAgrupacion.appendChild(divAgrupacionDato);
  }
     let elemento = document.getElementById(idElemento)
        elemento.append(divAgrupacion)
}


export{
    mostrarDatoEnId,
    mostrarDatoWeb,
    mostrarGastosAgrupadosWeb
}