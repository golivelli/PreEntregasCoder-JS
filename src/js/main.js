// PRE-ENTREGA 1
// COTIZADOR DE SEGUROS
let seguro = prompt("Ingresa la opción que deseas cotizar(Auto, Moto, Hogar, Cancelar):");

while(seguro == "" || seguro == null){
  console.log("Entrada vacía no aceptada.");
  seguro = prompt("Ingresa la opción que deseas cotizar(Auto, Moto, Hogar, Cancelar):");
}

while(!isNaN(seguro)){
  console.log("La opción ingresada no es valida, por favor ingrese una opción valida.");
  seguro = prompt("Ingrese la opción que desea cotizar (Auto, Moto, Hogar, Cancelar):");
}

seguro = seguro.toLowerCase();

if(seguro == "cancelar"){
  console.log("El usuario cancelo la entrada.");
} else{
  while(seguro != "auto" && seguro != "moto" && seguro != "hogar"){
    console.log("Por favor, ingrese una opción valida.");
    seguro = prompt("Ingrese la opción que desea cotizar (Auto, Moto, Hogar, Cancelar):");
  }
}

console.log(seguro);


// switch (seguro){
//   case  "1" :
//     console.log();
//     break;
//   case "2" :
//     console.log();
//     break;
//   case "3" :
//     console.log();
//     break;
//   default :
//     console.log();
// }



// function cotizarAuto(){

// }

// function cotizarMoto(){

// }

// function cotizarHogar() {
  
// }