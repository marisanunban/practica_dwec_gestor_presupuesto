// TODO: Crear las funciones, objetos y variables indicadas en el enunciado

// TODO: Variable global
let presupuesto = 0;

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
    // TODO
    let presupuestoActual = 'Tu presupuesto actual es de '+ presupuesto + ' €';
    return presupuestoActual;
}

function CrearGasto() {
    // TODO
}

// NO MODIFICAR A PARTIR DE AQUÍ: exportación de funciones y objetos creados para poder ejecutar los tests.
// Las funciones y objetos deben tener los nombres que se indican en el enunciado
// Si al obtener el código de una práctica se genera un conflicto, por favor incluye todo el código que aparece aquí debajo
export   {
    mostrarPresupuesto,
    actualizarPresupuesto,
    CrearGasto
}
