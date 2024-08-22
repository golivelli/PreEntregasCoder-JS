// PRE-ENTREGA 2
// COTIZADOR DE SEGUROS
const tipoDeSeguros = [
  {
    id: 0, // ID para identificar el plan.
    name: "Auto",
  },
  {
    id: 1,
    name: "Moto",
  },
];

const aseguradoras = [
  {
    id: 0,
    name: "La Holando Seguros",
  },
  {
    id: 1,
    name: "El Norte Seguros",
  },
  {
    id: 2,
    name: "Sancor Seguros",
  },
];

const planes = [
  // Planes de La Holando (aseguradora_id: 0)
  {
    id: 0, // Identificar Registro
    aseguradora_id: 0, // Identificar Aseguradora en el Registro
    tipo_id: 0, // Identificar Tipo de Seguro en el Registro
    tipo: "Basico",
    precio: 8200,
    cobertura: "Responsabilidad Civil",
  },
  {
    id: 1,
    aseguradora_id: 0, 
    tipo_id: 0,
    tipo: "Intermedio",
    precio: 15000,
    cobertura: "Tercero Completo",
  },
  {
    id: 2,
    aseguradora_id: 0, 
    tipo_id: 0,
    tipo: "Completo",
    precio: 22150,
    cobertura: "Todo Riesgo",
  },
  {
    id: 3,
    aseguradora_id: 0, 
    tipo_id: 1, 
    tipo: "Basico",
    precio: 4700,
    cobertura: "Responsabilidad Civil",
  },
  {
    id: 4,
    aseguradora_id: 0, 
    tipo_id: 1, 
    tipo: "Intermedio",
    precio: 8950,
    cobertura: "Tercero Completo",
  },
  {
    id: 5,
    aseguradora_id: 0, 
    tipo_id: 1, 
    tipo: "Completo",
    precio: 11450,
    cobertura: "Todo Riesgo",
  },

  // Planes de El Norte Seguros (aseguradora_id: 1)
  {
    id: 6,
    aseguradora_id: 1,
    tipo_id: 0,
    tipo: "Basico",
    precio: 7800,
    cobertura: "Responsabilidad Civil",
  },
  {
    id: 7,
    aseguradora_id: 1,
    tipo_id: 0,
    tipo: "Intermedio",
    precio: 16000,
    cobertura: "Tercero Completo",
  },
  {
    id: 8,
    aseguradora_id: 1,
    tipo_id: 0,
    tipo: "Completo",
    precio: 19900,
    cobertura: "Todo Riesgo",
  },
  {
    id: 9,
    aseguradora_id: 1,
    tipo_id: 1, 
    tipo: "Basico",
    precio: 5000,
    cobertura: "Responsabilidad Civil",
  },
  {
    id: 10,
    aseguradora_id: 1,
    tipo_id: 1, 
    tipo: "Intermedio",
    precio: 9200,
    cobertura: "Tercero Completo",
  },
  {
    id: 11,
    aseguradora_id: 1,
    tipo_id: 1, 
    tipo: "Completo",
    precio: 10000,
    cobertura: "Todo Riesgo",
  },

  // Planes de Sancor Seguros (aseguradora_id: 2)
  {
    id: 0, 
    tipo_id: 0,
    tipo: "Basico",
    precio: 8000,
    cobertura: "Responsabilidad Civil",
    aseguradora_id: 2,
  },
  {
    id: 1,
    tipo_id: 0,
    tipo: "Intermedio",
    precio: 15670,
    cobertura: "Tercero Completo",
    aseguradora_id: 2,
  },
  {
    id: 2,
    tipo_id: 0,
    tipo: "Completo",
    precio: 21700,
    cobertura: "Todo Riesgo",
    aseguradora_id: 2,
  },
  {
    id: 3, // esta es la id para identificar este plan
    tipo_id: 1, // moto
    tipo: "Basico",
    precio: 5200,
    cobertura: "Responsabilidad Civil",
    aseguradora_id: 2,
  },
  {
    id: 4,
    tipo_id: 1,
    tipo: "Intermedio",
    precio: 7550,
    cobertura: "Tercero Completo",
    aseguradora_id: 2,
  },
  {
    id: 5,
    tipo_id: 1,
    tipo: "Completo",
    precio: 14600,
    cobertura: "Todo Riesgo",
    aseguradora_id: 2,
  },
];

const cotizar = () => {
  // Función para "Elegir el tipo de Seguro (Auto - Moto)".
  function elegirSeguro(tipoDeSeguro) {
    let tipoSeg = tipoDeSeguro;
    // Validación de la entrada del usuario.
    while (
      tipoSeg === "" ||
      tipoSeg === null ||
      (tipoSeg !== "auto" && tipoSeg !== "moto" && tipoSeg !== "cancelar")
    ) {
      console.log(
        "Ingreso no válido, por favor ingrese una opción válida (Auto - Moto, Cancelar)."
      );
      tipoSeg = prompt(
        "Si desea realizar una cotización, por favor ingrese una opción (Auto - Moto, Cancelar)."
      ).toLowerCase();
    }

    if (tipoSeg === "cancelar") {
      console.log("El usuario canceló la entrada.");
      return;
    }

    mostrarCompanias(tipoSeg);
  }

  // Función para "Mostrar Compañías".
  function mostrarCompanias(tipoDeSeguro) {
    console.log(`Aseguradoras disponibles:`);

    const tipoSeg = tipoDeSeguros.find((seguro) => seguro.name.toLowerCase() == tipoDeSeguro);

    if (!tipoSeg) {
      console.log("No existe el tipo de seguro : " + tipoDeSeguro);
      return;
    }

    aseguradoras.forEach((aseguradora) => {
      console.log(`Aseguradora: ${aseguradora.name}`);

      const asegId = aseguradora.id;
      const planesAseguradora = planes.filter(
        (plan) => plan.aseguradora_id == asegId && plan.tipo_id == tipoSeg.id
      );

      if (planesAseguradora.length === 0) {
        console.log(
          "No hay planes disponibles para esta aseguradora."
        );
        return;
      }

      planesAseguradora.forEach((plan) => {
        console.log(
          `Tipo de Seguro: ${tipoDeSeguro}, Plan: ${plan.tipo}, Precio: $${plan.precio}, Cobertura: ${plan.cobertura}`
        );
      });

      console.log("\n");
    });

    filtrarPorPrecio(tipoDeSeguro);
  }

  // Función para "Filtar por Precio".
  function filtrarPorPrecio(tipoDeSeguro) {
    let continuarFiltrado = prompt(
      "¿Desea filtrar planes por precio? (Si - No)"
    ).toLowerCase();

    while (
      continuarFiltrado === "" ||
      (continuarFiltrado !== "no" &&
        continuarFiltrado !== "si" &&
        continuarFiltrado !== "cancelar")
    ) {
      console.log("Por favor, ingresa una opción valida para continuar.");
      continuarFiltrado = prompt(
        "¿Desea filtrar planes por precio? (Si - No)"
      ).toLowerCase();
    }

    if (continuarFiltrado === "no" || continuarFiltrado === "cancelar") {
      console.log("El usuario canceló el filtrado por precio.");
      buscarPorCobertura(tipoDeSeguro);
      return;
    } else {
      let precioMin = parseInt(prompt("Ingrese el precio mínimo a cotizar:"));
      let precioMax = parseInt(prompt("Ingrese el precio máximo a cotizar:"));

      // Validación de la entrada del usuario.
      while (precioMin <= 0 || precioMax <= 0 || precioMax < precioMin) {
        console.log(
          "Por favor, ingrese los montos solicitados de manera correcta."
        );
        precioMin = parseInt(prompt("Ingrese el precio mínimo a cotizar:"));
        precioMax = parseInt(prompt("Ingrese el precio máximo a cotizar:"));
      }

      // Filtrar por precio inidicado.
      const planesFiltrados = planes.filter((plan) => plan.precio >= precioMin && plan.precio <= precioMax);

      if (planesFiltrados.length > 0) {
        planesFiltrados.forEach((plan) => {
          const aseg = aseguradoras[plan.aseguradora_id]?.name ?? "Aseguradora no encontrada.";
          console.log(`Aseguradora: ${aseg}, Plan: ${plan.tipo}, Precio: $${plan.precio}, Cobertura: ${plan.cobertura}`);
        });
        console.log("\n");
      } else {
        console.log("No hay en planes en ese rango de precio.");
      }
    }
    buscarPorCobertura(tipoDeSeguro);
  }

  // Función para "Buscar por Cobertura".
  function buscarPorCobertura(tipoDeSeguro) {
    let continuarBusqueda = prompt("¿Desea buscar una cobertura específica? (Sí - No)").toLowerCase();

    while (
      continuarBusqueda === "" ||
      (continuarBusqueda !== "no" && continuarBusqueda !== "si")
    ) {
      console.log("Por favor, ingresa una opción valida para continuar.");
      continuarBusqueda = prompt("¿Desea buscar una cobertura específica? (Si - No)").toLowerCase();
    }

    if (continuarBusqueda === "no") {
      console.log("El usuario canceló el filtrado por coberturta.");
      return;
    } else {
      let coberturaABuscar = prompt("¿Sobre que cobertura deseas obtener una cotización? (Responsabilidad Civil - Tercero Completo - Todo Riesgo)").toLowerCase();

      while (
        coberturaABuscar !== "responsabilidad civil" &&
        coberturaABuscar !== "tercero completo" &&
        coberturaABuscar !== "todo riesgo" &&
        coberturaABuscar !== "cancelar"
      ) {
        console.log("Ingreso no válido, por favor ingrese una opción válida (Responsabilidad Civil - Tercero Completo - Todo Riesgo, Cancelar).");
        coberturaABuscar = prompt("¿Sobre que cobertura deseas obtener una cotización? (Responsabilidad Civil - Tercero Completo - Todo Riesgo, Cancelar)").toLowerCase();
      }

      if (coberturaABuscar === "cancelar") {
        console.log("El usuario canceló la búsqueda de cobertura.");
        return;
      }

      // Filtrar por coberturas.
      const coberturasFiltradas = planes.filter((plan) => plan.cobertura.toLowerCase() == coberturaABuscar);

      if (coberturasFiltradas.length > 0) {
        coberturasFiltradas.forEach((plan) => {
          const cobertura = plan.cobertura ?? "Cobertura no encontrada.";
          console.log(`Plan: ${plan.tipo}, Cobertura: ${cobertura}, Precio: $${plan.precio}`);
        });
        console.log("\n");
      } else {
        console.log("No existe esa cobertura.");
      }

      // if (coberturasFiltradas) {
      //   console.log(`Aseguradora: ${cobertura.aseguradora_id}, Plan: ${cobertura.cobertura}, Precio: ${cobertura.precio}`);
      // }

      // if(!coberturasFiltradas.length === 0){
      //   console.log("No existe la cobertura ingresada");
      //   return
      // }
    }
  }

  let tipoDeSeguro = prompt("Ingresa el tipo de seguro que deseas cotizar (Auto - Moto, Cancelar).").toLowerCase();
  elegirSeguro(tipoDeSeguro);
};

const btn = document.getElementById("cotizar");

btn.addEventListener("click", () => cotizar());
