// PRE-ENTREGA 3

// COTIZADOR
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

const coberturas = [
  {
    id: 0,
    name: "Responsabilidad Civil",
  },
  {
    id: 1,
    name: "Tercero Completo",
  },
  {
    id: 2,
    name: "Todo Riesgo",
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
    cobertura: 0,
  },
  {
    id: 1,
    aseguradora_id: 0,
    tipo_id: 0,
    tipo: "Intermedio",
    precio: 15000,
    cobertura: 1,
  },
  {
    id: 2,
    aseguradora_id: 0,
    tipo_id: 0,
    tipo: "Completo",
    precio: 22150,
    cobertura: 2,
  },
  {
    id: 3,
    aseguradora_id: 0,
    tipo_id: 1,
    tipo: "Basico",
    precio: 4700,
    cobertura: 0,
  },
  {
    id: 4,
    aseguradora_id: 0,
    tipo_id: 1,
    tipo: "Intermedio",
    precio: 8950,
    cobertura: 1,
  },
  {
    id: 5,
    aseguradora_id: 0,
    tipo_id: 1,
    tipo: "Completo",
    precio: 11450,
    cobertura: 2,
  },

  // Planes de El Norte Seguros (aseguradora_id: 1)
  {
    id: 6,
    aseguradora_id: 1,
    tipo_id: 0,
    tipo: "Basico",
    precio: 7800,
    cobertura: 0,
  },
  {
    id: 7,
    aseguradora_id: 1,
    tipo_id: 0,
    tipo: "Intermedio",
    precio: 16000,
    cobertura: 1,
  },
  {
    id: 8,
    aseguradora_id: 1,
    tipo_id: 0,
    tipo: "Completo",
    precio: 19900,
    cobertura: 2,
  },
  {
    id: 9,
    aseguradora_id: 1,
    tipo_id: 1,
    tipo: "Basico",
    precio: 5000,
    cobertura: 0,
  },
  {
    id: 10,
    aseguradora_id: 1,
    tipo_id: 1,
    tipo: "Intermedio",
    precio: 9200,
    cobertura: 1,
  },
  {
    id: 11,
    aseguradora_id: 1,
    tipo_id: 1,
    tipo: "Completo",
    precio: 10000,
    cobertura: 2,
  },

  // Planes de Sancor Seguros (aseguradora_id: 2)
  {
    id: 0,
    tipo_id: 0,
    tipo: "Basico",
    precio: 8000,
    cobertura: 0,
    aseguradora_id: 2,
  },
  {
    id: 1,
    tipo_id: 0,
    tipo: "Intermedio",
    precio: 15670,
    cobertura: 1,
    aseguradora_id: 2,
  },
  {
    id: 2,
    tipo_id: 0,
    tipo: "Completo",
    precio: 21700,
    cobertura: 2,
    aseguradora_id: 2,
  },
  {
    id: 3, // esta es la id para identificar este plan
    tipo_id: 1, // moto
    tipo: "Basico",
    precio: 5200,
    cobertura: 0,
    aseguradora_id: 2,
  },
  {
    id: 4,
    tipo_id: 1,
    tipo: "Intermedio",
    precio: 7550,
    cobertura: 1,
    aseguradora_id: 2,
  },
  {
    id: 5,
    tipo_id: 1,
    tipo: "Completo",
    precio: 14600,
    cobertura: 2,
    aseguradora_id: 2,
  },
];

// DECLRACIÓN DE VARIABLES
const tipoSeguroElement = document.getElementById("tipoSeguro");
const aseguradoraElement = document.getElementById("selectAseguradora");
const coberturaElement = document.getElementById("tipoCobertura");
const precioElement = document.getElementById("precio");

const mostrarErrores = document.getElementById("erroresCotizacion");
const cotizarSeguro = document.getElementById("cotizarSeguro");
var tablaBody = document.getElementById("tablaBody");

const divError = document.getElementById("erroresCotizacion");

// MENSAJE ERROR
const msjErrorCotizacion = function (mensajes) {
  const divErrorCotizacion = document.getElementById("erroresCotizacion");
  divErrorCotizacion.innerHTML = "";

  mensajes.forEach(function (mensaje) {
    const p = document.createElement("p");
    p.textContent = mensaje;
    divErrorCotizacion.appendChild(p);
  });
};

// VALIDAR CAMPOS
function validarCampos(data) {
  let errors = [];
  const { tipo_seguro, aseguradora, cobertura, precio } = data;

  if (
    tipo_seguro === null ||
    tipo_seguro === undefined ||
    !tipoDeSeguros.find((tipo) => tipo.id == parseInt(tipo_seguro))
  ) {
    errors.push(
      "El campo tipo seguro es requerido y debe ser un tipo de seguro valido."
    );
  }

  if (
    aseguradora &&
    !aseguradoras.find((aseg) => aseg.id == parseInt(aseguradora))
  ) {
    errors.push("La aseguradora seleccionada no es valida.");
  }

  if (cobertura && !coberturas.find((cob) => cob.id == parseInt(cobertura))) {
    errors.push("La cobertura seleccionada no es valida.");
  }

  if (precio && isNaN(precio) && precio <= 0) {
    errors.push("Si quieres filtrar por precio debes poner un precio valido.");
  }

  return errors;
}

//MOSTRAR TABLA
function mostrarTabla(data) {
  let tablaContent = "";
  const { tipo_seguro, aseguradora, cobertura, precio } = data;

  let plans = planes.filter((plan) => plan.tipo_id == parseInt(tipo_seguro));

  if (aseguradora) {
    plans = plans.filter(
      (plan) => plan.aseguradora_id == parseInt(aseguradora)
    );
  }

  if (cobertura) {
    plans = plans.filter((plan) => plan.cobertura == parseInt(cobertura));
  }

  if (precio) {
    plans = plans.filter((plan) => plan.precio <= parseInt(precio));
  }

  if (plans.length === 0) {
    tablaContent += `
      <tr>
        <td colspan="6" class="text-center p-2">No encontramos planes</td>
      </tr> 
    `;
  }

  plans.forEach((plan) => {
    const tipoSeg = tipoDeSeguros.find(
      (tipo) => tipo.id == parseInt(plan.tipo_id)
    );
    const aseg = aseguradoras.find(
      (asegu) => asegu.id == parseInt(plan.aseguradora_id)
    );
    const cob = coberturas.find(
      (cober) => cober.id == parseInt(plan.cobertura)
    );

    tablaContent += `
      <tr>
        <td class="p-5 dm-sans-600-normal text-lg text-shadow-2 text-center">${
          plan.id + 1
        }</td>
        <td class="p-5 dm-sans-600-normal text-lg text-shadow-2 text-center">${
          plan.tipo
        }</td>
        <td class="p-5 dm-sans-600-normal text-lg text-shadow-2 text-center">${
          tipoSeg?.name ?? "No aplica."
        }</td>
        <td class="p-5 dm-sans-600-normal text-lg text-shadow-2 text-center">${
          aseg?.name ?? "No aplica."
        }</td>
        <td class="p-5 dm-sans-600-normal text-lg text-shadow-2 text-center">${
          cob?.name ?? "No aplica."
        }</td>
        <td class="p-5 dm-sans-600-normal text-lg text-shadow-2 text-center">$ ${
          plan.precio
        } ARS</td>
      </tr>
    `;
  });

  tablaBody.innerHTML = tablaContent;
}

// ASIGNAR OPCIONES
const asignarOptions = () => {
  // OPCIONES TIPO DE SEGURO
  let optionsTipoSeguro = `<option class="text-center dm-sans-normal" value="">Selecciona un tipo de seguro</option>`;

  tipoDeSeguros.forEach((tipo) => {
    optionsTipoSeguro += `<option class="text-center dm-sans-normal" value="${tipo.id}">${tipo.name}</option>`;
  });

  // OPCIONES ASEGURADORAS
  let optionsAseguradoras = `<option class="text-center dm-sans-normal" value="">Selecciona una aseguradora</option>`;

  aseguradoras.forEach((aseg) => {
    optionsAseguradoras += `<option class="text-center dm-sans-normal" value="${aseg.id}">${aseg.name}</option>`;
  });

  // OPCIONES COBERTURAS
  let optionsCobertura = `<option class="text-center dm-sans-normal" value="">Selecciona una cobertura</option>`;

  coberturas.forEach((cob) => {
    optionsCobertura += `<option class="text-center dm-sans-normal" value="${cob.id}">${cob.name}</option>`;
  });

  tipoSeguroElement.innerHTML = optionsTipoSeguro;
  aseguradoraElement.innerHTML = optionsAseguradoras;
  coberturaElement.innerHTML = optionsCobertura;
};

document.addEventListener("DOMContentLoaded", function () {
  asignarOptions();

  cotizarSeguro.addEventListener("submit", function (event) {
    event.preventDefault();

    const data = {
      tipo_seguro: tipoSeguroElement.value,
      aseguradora: aseguradoraElement.value,
      cobertura: coberturaElement.value,
      precio: precioElement.value,
    };

    const errores = validarCampos(data);

    if (errores.length > 0) {
      mostrarErrores.classList.remove("hidden");
      msjErrorCotizacion(errores);

      return;
    } else {
      mostrarErrores.classList.add("hidden");
    }

    // MOSTRAR TABLA
    mostrarTabla(data);
  });
});
