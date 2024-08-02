// PRE-ENTREGA 1
// COTIZADOR DE SEGUROS

//isNaN() <--- No es un numero
//!isNaN() <--- Quiere decir que esto es un numero

const cotizar = () => {
  let seguro;
  let valid = false;

  // Función para obtener y validar el precio de un seguro
  const obtenerPrecio = (tipo) => {
    let precio = parseFloat(prompt(`Ingresa el precio del ${tipo}:`));

    while(precio <= 0 || isNaN(precio)){
      console.log("Por favor, ingrese de forma numérica el valor del vehículo.");
      precio = parseFloat(prompt("Por favor, ingrese de forma numérica el valor del vehículo:"));
    }

    return precio;
  }

  // Función para calcular el precio final del seguro
  const calcularPrecio = (precio, precioSeguro) => {
    const precioIVA = precio * 0.21;
    return precio + precioSeguro + precioIVA;
  }

  // Función para Seguro de Auto
  const seguroDeVehiculo = (tipoSeguro) => {
    const precioVehiculo = obtenerPrecio("vehiculo");
    const precioFinalSeguro = calcularPrecio(precioVehiculo, 8500);
    console.log("El precio final de tu seguro de " + tipoSeguro.toLowerCase() + " es de: $" + precioFinalSeguro.toFixed(2) + " ARS.");
  }

  // Función para Seguro de Moto
  const seguroDeMoto = (tipoSeguro) => {
    const precioMoto = obtenerPrecio("moto");
    const precioFinalSeguro = calcularPrecio(precioMoto, 7500);
    console.log("El precio final de tu seguro de " + tipoSeguro.toLowerCase() + " es de: $" + precioFinalSeguro.toFixed(2) + " ARS.");
  }

  // Función para Seguro de Hogar
  const seguroDeHogar = (tipoSeguro) => {
    const precioHogar = obtenerPrecio("hogar");
    const precioFinal = calcularPrecio(precioHogar, 9500);
    console.log("El precio final de tu seguro de " + tipoSeguro.toLowerCase() + " es de: $" + precioFinal.toFixed(2) + " ARS.");
  }

  do{
    seguro = prompt("Ingresa la opción que deseas cotizar (Vehiculo, Moto, Hogar, Cancelar):");

    if (seguro == "" || seguro == null){
      console.log("El usuario no ingreso ninguna opción para cotizar.");
      break;
    } 

    while(!isNaN(seguro)){
      console.log("Ingreso no valido, ingresar las opciones mostradas.");
      seguro = prompt("Ingresa la opción que deseas cotizar (Vehiculo, Moto, Hogar, Cancelar):");
    }
    valid = true;
  }while(valid == false);

  switch(seguro.toLowerCase()){
    case "vehiculo" :
      seguroDeVehiculo(seguro); 
      break;
    case "moto" :
      seguroDeMoto(seguro);
      break;
    case "hogar" :
      seguroDeHogar(seguro);  
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
