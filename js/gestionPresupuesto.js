
let presupuesto = 0;
let gastos = [];
let idGasto = 0;

function actualizarPresupuesto(nuevoPresupuesto) {
   if (nuevoPresupuesto >= 0){
    presupuesto = nuevoPresupuesto;
    return presupuesto;
   }
   else{
    let error = -1;
    console.log("Error.El presupuesto no puede ser menor a 0 ");
    return error;
   }
}

function mostrarPresupuesto() {

    let presupuestoActual = 'Tu presupuesto actual es de '+ presupuesto + ' €';
    return presupuestoActual;
}

function CrearGasto(descripcion, valor, fecha , ...etiquetas) {
    
    this.mostrarGasto = function() {
        let gastoAhora = `Gasto correspondiente a ${this.descripcion} con valor ${this.valor}`;
        return gastoAhora;
    }
    this.mostrarGastoCompleto = function(){
        let gastoCompleto = `Gasto correspondiente a ${this.descripcion } con valor ${this.valor} €.
Fecha: ${new Date(this.fecha).toLocaleString()}
Etiquetas:\n`

        for (let etiqueta of this.etiquetas) {
            gastoCompleto += `- ${etiqueta}\n`
        }
        return gastoCompleto;
    }
    this.actualizarDescripcion = function(descri){
        this.descripcion = descri;
    }
    this.actualizarValor = function(valor){
        if(valor >= 0){
        this.valor = valor;
        }
     
    }
    this.actualizarFecha = function(fecha){
        let fechaNueva = Date.parse(fecha);
        if (fechaNueva) {
            this.fecha = fechaNueva;
        }
    }
    this.anyadirEtiquetas = function(...etiquetas){
        for(let contenidoEtiqueta of etiquetas){
            if(!this.etiquetas.includes(contenidoEtiqueta)){
                this.etiquetas.push(contenidoEtiqueta); 
            }
        }
        
    } 



    this.borrarEtiquetas = function(...etiquetasParam){
        this.etiquetas = this.etiquetas.filter(function(etiqueta) {
            return etiquetasParam.indexOf(etiqueta) === -1;
        });
    }
    this.obtenerPeriodoAgrupacion = function(fecha){
        let fechaComprobar = new Date(this.fecha);
        let fechapedida = "";
        let dia = fechaComprobar.getDate()
        if(dia <10){
            dia = `0` + dia;
        }
        let mes = fechaComprobar.getMonth()+1;
        if(mes < 10){
        mes = `0` + mes;
        }
        let anyo = fechaComprobar.getFullYear()

        switch(fecha){
            case "dia":

                fechapedida =`${anyo}-${mes}-${dia}`;
                break;

            case "mes":
                fechapedida = `${anyo}-${mes}`;
                break;

            case "anyo":
                fechapedida = `${anyo}`;
                break;
        }
        return fechapedida;
        
    }

    this.descripcion = descripcion;
    if(valor >= 0){
    this.valor = valor;
    }
    else{
        this.valor = 0;
    }
    if(etiquetas.length === 0){
        this.etiquetas = [];
    }
    else{
        this.etiquetas = [];
        this.anyadirEtiquetas(...etiquetas);

    }

    let fechaNueva = Date.parse(fecha);
    if (fechaNueva){
        this.fecha = fechaNueva;
    }
    else{
        this.fecha = Date.parse(new Date());
    }

}

function listarGastos(){
return gastos;
}
function anyadirGasto(gasto){
    gasto.id = idGasto++;
    gastos.push(gasto);
}
function borrarGasto(id){
    let gastoBorrar = "";

    for(let gastoBuscar of gastos){
        if(gastoBuscar.id == id ){
            gastoBorrar = gastoBuscar
        }
    }
    if(gastoBorrar){
        let posicionGasto = gastos.indexOf(gastoBorrar);
        gastos.splice(posicionGasto,1);
    }
    
}
// se puede hacer con for pero consideré que usar reduce era más optimo
function calcularTotalGastos(){
 let totalGastos = gastos.reduce (function (acc, gastoAhora){
    return acc + gastoAhora.valor;} , 0);
    return totalGastos;
 } 


function calcularBalance(){
    return presupuesto - calcularTotalGastos();

}
function filtrarGastos(datos){
    return gastos.filter(function(gasto){
        var resultadoFiltro = true;
        if(datos.fechaDesde){
            var fDesde = Date.parse(datos.fechaDesde);
            if(gasto.fecha < fDesde){
                resultadoFiltro = false;
            }
        }
        if(datos.fechaHasta){
            var fHasta = Date.parse(datos.fechaHasta);
            if(gasto.fecha > fHasta){
                resultadoFiltro = false;
            }
        }
        if(datos.valorMinimo){
            if(gasto.valor < datos.valorMinimo){
                resultadoFiltro = false;
            }
        }
        if(datos.valorMaximo){
            if(gasto.valor > datos.valorMaximo){
                resultadoFiltro = false;
            }
        }
        if (datos.descripcionContiene) {
            if(gasto.descripcion.indexOf(datos.descripcionContiene) == -1){
            resultadoFiltro = false;
            }
        }
        if(datos.etiquetasTiene){
            let etiquetasExisten = false;
            for (let etiqueta of datos.etiquetasTiene) {
                if (gasto.etiquetas.indexOf(etiqueta) > -1) {
                    etiquetasExisten = true;
                }
            }
            if(etiquetasExisten == false){
                resultadoFiltro = false;
            }
    }
        return resultadoFiltro;
    })

}
function agruparGastos(periodo, etiquetas, fechaDesde, fechaHasta){
    let filtrarGastosRes = filtrarGastos({etiquetasTiene: etiquetas, fechaDesde: fechaDesde, fechaHasta: fechaHasta});

    return filtrarGastosRes.reduce(function(acc, gasto) {

        let periodoActual = gasto.obtenerPeriodoAgrupacion(periodo);

	if (acc[periodoActual]) {
	    acc[periodoActual] = acc[periodoActual] + gasto.valor;
	} 
    else {
	    acc[periodoActual] = gasto.valor;
	}
        return acc;
    }, {})

}

// NO MODIFICAR A PARTIR DE AQUÍ: exportación de funciones y objetos creados para poder ejecutar los tests.
// Las funciones y objetos deben tener los nombres que se indican en el enunciado
// Si al obtener el código de una práctica se genera un conflicto, por favor incluye todo el código que aparece aquí debajo
export   {
    mostrarPresupuesto,
    actualizarPresupuesto,
    CrearGasto,
    listarGastos,
    anyadirGasto,
    borrarGasto,
    calcularTotalGastos,
    calcularBalance,
    filtrarGastos,
    agruparGastos
}
