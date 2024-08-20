// PRE-ENTREGA 2
// COTIZADOR DE SEGUROS
const cotizar = () => {
  const companias = [
    {
      nombre : "Sancor Seguros",
      planes : {
        auto : [
          {tipo : "Basico", precio : 8000, cobertura : "Responsabilidad Civil"}, 
          {tipo : "Intermedio", precio : 15670, cobertura : "Tercero Completo"}, 
          {tipo : "Completo", precio : 21700, cobertura : "Todo Riesgo"}
        ],
        moto : [
          {tipo : "Basico", precio : 5200, cobertura : "Responsabilidad Civil"},
          {tipo : "Intermedio", precio : 7550, cobertura : "Tercero Completo"}, 
          {tipo : "Completo", precio : 14600, cobertura : "Todo Riesgo"}
        ]
      }
    },
    {
      nombre : "La Holando Seguros",
      planes : {
        auto : [
          {tipo : "Basico", precio : 8200, cobertura : "Responsabilidad Civil"},
          {tipo : "Intermedio", precio : 15000, cobertura : "Tercero Completo"},
          {tipo : "Completo", precio : 22150, cobertura : "Todo Riesgo"}
        ],
        moto : [
          {tipo : "Basico", precio : 4700, cobertura : "Responsabilidad Civil"},
          {tipo : "Intermedio", precio : 8950, cobertura : "Tercero Completo"},
          {tipo : "Completo", precio : 11450, cobertura : "Todo Riesgo"}
        ]
      }
    },
    {
      nombre : "El Norte Seguros",
      planes : {
        auto : [
          {tipo : "Basico", precio : 7800, cobertura : "Responsabilidad Civil"},
          {tipo : "Intermedio", precio : 16000, cobertura : "Tercero Completo"},
          {tipo : "Completo", precio : 19900, cobertura : "Todo Riesgo"}
        ],
        moto : [
          {tipo : "Basico", precio : 5000, cobertura : "Responsabilidad Civil"},
          {tipo : "Intermedio", precio : 9200, cobertura : "Tercero Completo"},
          {tipo : "Completo", precio : 10000, cobertura : "Todo Riesgo"},
        ]
      } 
    },
  ];

  // Función para "Elegir el tipo de Seguro (Auto - Moto)".
  function elegirSeguro(tipoDeSeguro){
    // Validación de la entrada del usuario.
    while(
      tipoDeSeguro === "" || 
      tipoDeSeguro === null || 
      (tipoDeSeguro !== "auto" && tipoDeSeguro !== "moto" && tipoDeSeguro !== "cancelar")
    ){
      console.log("Ingreso no válido, por favor ingrese una opción válida (Auto - Moto, Cancelar).");
      tipoDeSeguro = prompt("Si desea realizar una cotización, por favor ingrese una opción (Auto - Moto, Cancelar).").toLowerCase();
    };

    if(tipoDeSeguro === "cancelar"){
      console.log("El usuario canceló la entrada.");
      return;
    } else if(tipoDeSeguro === "auto" || tipoDeSeguro === "moto"){
      mostrarCompanias(tipoDeSeguro);
      return;
    }

    mostrarCompanias(tipoDeSeguro);
  };
  
  // Función para "Mostrar Compañías".
  function mostrarCompanias(tipoDeSeguro) {
    console.log(`Compañías disponibles para seguro de ${tipoDeSeguro}:`);
  
    companias.forEach(companias => {
      console.log(`Compañía: ${companias.nombre}`);
      console.log("Planes disponibles");
  
      if (companias.planes && companias.planes[tipoDeSeguro]) {
        const planes = companias.planes[tipoDeSeguro];
        planes.forEach(plan => {
          console.log(`Plan ${plan.tipo}: Precio base $${plan.precio}, Cobertura: ${plan.cobertura}`);
        });
      } else {
        console.log(`No se encontraron planes para ${tipoDeSeguro} en ${companias.nombre}`);
      };
  
      console.log("\n"); 
    });
    
    filtrarPorPrecio(tipoDeSeguro);
  };

  // Función para "Filtar por Precio".
  function filtrarPorPrecio(){ 
    let continuarFiltrado = prompt("¿Desea filtrar planes por precio? (Si - No)").toLowerCase();

    while(continuarFiltrado === "" || continuarFiltrado !== "no" && continuarFiltrado !== "si" && continuarFiltrado !== "cancelar"){
      console.log("Por favor, ingresa una opción valida para continuar.");
      continuarFiltrado = prompt("¿Desea filtrar planes por precio? (Si - No)").toLowerCase();
    }

    if(continuarFiltrado === "no" || continuarFiltrado === "cancelar"){
      console.log("El usuario canceló el filtrado por precio.");
      buscarPorCobertura(tipoDeSeguro);
      return;
    } else {
      let precioMin = parseInt(prompt("Ingrese el precio mínimo a cotizar:"));
      let precioMax = parseInt(prompt("Ingrese el precio máximo a cotizar:"));
        
      // Validación de la entrada del usuario.
      while((precioMin <= 0) || (precioMax <= 0) || (precioMax < precioMin)){
        console.log("Por favor, ingrese los montos solicitados de manera correcta.");
        precioMin = parseInt(prompt("Ingrese el precio mínimo a cotizar:"));
        precioMax = parseInt(prompt("Ingrese el precio máximo a cotizar:"));
      };

      // Filtrar por precio inidicado.
      companias.forEach(compania => {
        const planes = tipoDeSeguro === "auto" ? compania.planes.auto : compania.planes.moto;
        const planesFiltrados = planes.filter(plan => plan.precio >= precioMin && plan.precio <= precioMax);
        
        if(planesFiltrados.length > 0){
          console.log(`\nPlanes encontrados en ${compania.nombre}:`);
        
          planesFiltrados.forEach(plan =>{
            console.log(`Plan: ${plan.tipo}, Precio: $${plan.precio}, Cobertura: ${plan.cobertura}`);
          });
        };
      });
    };
    buscarPorCobertura(tipoDeSeguro);
  };

  // Función para "Buscar por Cobertura".
  function buscarPorCobertura(tipoDeSeguro){
    let continuarBusqueda = prompt("¿Desea buscar una cobertura específica? (Sí - No)").toLowerCase();

    while(continuarBusqueda === "" || (continuarBusqueda !== "no" && continuarBusqueda !== "si")){
      console.log("Por favor, ingresa una opción valida para continuar.");
      continuarBusqueda = prompt("¿Desea buscar una cobertura específica? (Si - No)").toLowerCase();
    }

    if(continuarBusqueda === "no"){
      console.log("El usuario canceló el filtrado por precio.");
      return;
    } else {
      coberturaABuscar = prompt("¿Sobre que cobertura deseas obtener una cotización? (Responsabilidad Civil - Tercero Completo - Todo Riesgo)").toLowerCase();

      while(
        coberturaABuscar !== "responsabilidad civil" &&
        coberturaABuscar !== "tercero completo" &&
        coberturaABuscar !== "todo riesgo" &&
        coberturaABuscar !== "cancelar"
      ){
        console.log("Ingreso no válido, por favor ingrese una opción válida (Responsabilidad Civil - Tercero Completo - Todo Riesgo, Cancelar).");
        coberturaABuscar = prompt("¿Sobre que cobertura deseas obtener una cotización? (Responsabilidad Civil - Tercero Completo - Todo Riesgo, Cancelar)").toLowerCase();
      };

      if(coberturaABuscar === "cancelar"){
        console.log("El usuario canceló la búsqueda de cobertura.");
        return;
      }
  
      // Búsqueda de coberturas sobre el valor ingresado.
      companias.forEach(compania => {
        const planes = tipoDeSeguro === "auto" ? compania.planes.auto : compania.planes.moto;
  
        planes.forEach(plan => {
          if(plan.cobertura.toLowerCase() === coberturaABuscar){
            console.log(`Compañía: ${compania.nombre}, Plan: ${plan.tipo}, Precio: ${plan.precio}`);
          }; 
        });
      });
    }
  };

  let tipoDeSeguro = prompt("Ingresa el tipo de seguro que deseas cotizar (Auto - Moto, Cancelar).").toLowerCase();
  elegirSeguro(tipoDeSeguro);
};

const btn = document.getElementById("cotizar");

btn.addEventListener("click", () => cotizar());