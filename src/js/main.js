// PRE-ENTREGA 1
// COTIZADOR DE SEGUROS

//isNaN() <--- No es un numero
//!isNaN() <--- Quiere decir que esto es un numero

const cotizar = () => {
  let seguro;
  let valid = false;

  // Función para Seguro de Auto
  const seguroDeVehiculo = (tipoSeguro) => {
    let precioVehiculo = parseFloat(prompt("Ingresa el precio del vehículo:"));
    let precioSeguro = 8500;
    let precioIVA = precioVehiculo * 0.21;

    while(precioVehiculo <= 0 && isNaN(precioVehiculo)){
      precioVehiculo = prompt("Por favor, ingrese de forma numérica el valor del vehículo:");
    }

    let precioFinalSeguro = precioVehiculo + parseFloat(precioSeguro) + parseFloat(precioIVA);

    console.log("El precio final de tu seguro de " + tipoSeguro.toLowerCase() + " es de: $" + precioFinalSeguro.toFixed(2) + " ARS.");
  }

  // Función para Seguro de Moto
  const seguroDeMoto = (tipoSeguro) => {
    let precioMoto = parseFloat(prompt("Ingresa el precio de la moto:"));
    let precioSeguro = 7500;
    let precioIVA = precioMoto * 0.21;

    while(precioMoto <= 0 && isNaN(precioMoto)){
      precioMoto = prompt("Por favor, ingrese de forma numérica el valor de la moto:");
    }

    let precioFinalSeguro = precioMoto + parseFloat(precioSeguro) + parseFloat(precioIVA);

    console.log("El precio final de tu seguro de " + tipoSeguro.toLowerCase() + " es de: $" + precioFinalSeguro.toFixed(2) + " ARS.");
  }

  // Función para Seguro de Hogar
  const seguroDeHogar = (tipoSeguro) => {
    let precioHogar = parseFloat(prompt("Ingresa el valor estimado de tu hogar:"));
    let precioSeguro = 9500;
    let precioIVA = precioHogar * 0.21;

    while(precioHogar <= 0 && isNaN(precioHogar)){
      precioHogar = prompt("Por favor, ingrese de forma numérica el valor estimado de tu hogar:");
    }

    let precioFinalSeguro = precioHogar + parseFloat(precioSeguro) + parseFloat(precioIVA);

    console.log("El precio final de tu seguro de " + tipoSeguro.toLowerCase() + " es de: $" + precioFinalSeguro.toFixed(2) + " ARS.");
  }

  do{
    seguro = prompt("Ingresa la opción que deseas cotizar (Vehiculo, Moto, Hogar, Cancelar):");

    if (seguro.toLowerCase() == "cancelar") {
      break;
    }

    if (!(seguro == "" || seguro == null) && !(!isNaN(seguro))) {
      valid = true
    }
  }while(valid == false);

  switch(seguro.toLowerCase()){
    case "vehiculo" :
      let seguroVehiculo = seguroDeVehiculo(seguro); 
      break;
    case "moto" :
      let seguroMoto = seguroDeMoto(seguro);
      break;
    case "hogar" :
      let seguroHogar = seguroDeHogar(seguro);  
      break;
    case "cancelar":
      console.log("El ingreso fue cancelado."); 
    break;
    default :
      console.log("El dato ingresado es incorrecto.");
  }
}


const btn = document.getElementById("cotizar");

btn.addEventListener("click", () => cotizar());



// while(seguro == "" || seguro == null){
//   console.log("Entrada vacía no aceptada.");
//   seguro = prompt("Ingresa la opción que deseas cotizar (Vehiculo, Moto, Hogar, Cancelar):");
// }

// while(!isNaN(seguro)){
//   console.log("La opción ingresada no es valida, por favor ingrese una opción valida.");
//   seguro = prompt("Ingrese la opción que desea cotizar (Vehiculo, Moto, Hogar, Cancelar):");
// }

// if(seguro.toLowerCase() == "cancelar"){
//   console.log("El usuario cancelo la entrada.");
// } else{
//   while(seguro.toLowerCase() != "vehiculo" && seguro.toLowerCase() != "moto" && seguro.toLowerCase() != "hogar"){
//     console.log("Por favor, ingrese una opción valida.");
//     seguro = prompt("Ingrese la opción que desea cotizar (Vehiculo, Moto, Hogar, Cancelar):");
//   }
// }