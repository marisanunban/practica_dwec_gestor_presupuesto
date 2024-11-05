
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

function CrearGasto(descripcion, valor) {

    this.descripcion = descripcion;
    if(valor >= 0){
    this.valor = valor;
    }
    else{
        this.valor = 0;
    }
    this.mostrarGasto = function() {
        let gastoAhora = 'Gasto correspondiente a ' + descripcion + ' con valor ' + valor + ' €';
        return gastoAhora;
    }
    this.actualizarDescripcion = function(descripcion){
        this.descripcion = descripcion;
    }
    this.actualizarValor = function(valor){
        if(valor >= 0){
        this.valor = valor;
        }
        
    }

}
function listarGastos(){

}
function anyadirGasto(){

}
function borrarGasto(){
    
}
function calcularTotalGastos(){

}
function calcularBalance(){
    
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
