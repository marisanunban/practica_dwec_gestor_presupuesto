
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

    
    this.mostrarGasto = function() {
        let gastoAhora = 'Gasto correspondiente a ' + descripcion + ' con valor ' + valor + ' €';
        return gastoAhora;
    }
    this.actualizarDescripcion = function(descri){
        this.descripcion = descri;
    }
    this.actualizarValor = function(valor){
        if(valor >= 0){
        this.valor = valor;
        }
        
    }
    this.anyadirEtiquetas = function(...etiquetas){
        for(let contenidoEtiqueta of etiquetas){
            if(!this.etiquetas.includes(contenidoEtiqueta)){
                this.etiquetas.push(contenidoEtiqueta); 
            }
        }
        
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
function calcularTotalGastos(){
 let totalGastos = gastos.reduce (function (acc, gastoAhora){
    return acc + gastoAhora;} , 0);
    return totalGastos;
 }

function calcularBalance(){
    return presupuesto - calcularTotalGastos();

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
    calcularBalance
}
