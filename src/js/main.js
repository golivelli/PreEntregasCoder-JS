// PRE-ENTREGA 3
// COTIZADOR

// DECLRACIÓN DE VARIABLES
const tipoSeguroElement = document.getElementById("tipoSeguro");
const aseguradoraElement = document.getElementById("selectAseguradora");
const coberturaElement = document.getElementById("tipoCobertura");
const precioElement = document.getElementById("precio");

const mostrarErrores = document.getElementById("erroresCotizacion");
const cotizarSeguro = document.getElementById("cotizarSeguro");
var tablaBody = document.getElementById("tablaBody");

const divError = document.getElementById("erroresCotizacion");

let tipoDeSeguros = [];
let aseguradoras = [];
let coberturas = [];
let planes = [];

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

  // VALIDAR CAMPO "TIPO DE SEGURO"
  if (
    tipo_seguro === null ||
    tipo_seguro === undefined ||
    !tipoDeSeguros.find((tipo) => tipo.id == parseInt(tipo_seguro))
  ) {
    errors.push(
      "El campo tipo seguro es requerido y debe ser un tipo de seguro valido."
    );
  }

  // VALIDAR CAMPO "ASEGURADORA"
  if (
    aseguradora &&
    !aseguradoras.find((aseg) => aseg.id == parseInt(aseguradora))
  ) {
    errors.push("La aseguradora seleccionada no es valida.");
  }

  // VALIDAR CAMPO "COBERTURA"
  if (cobertura && !coberturas.find((cob) => cob.id == parseInt(cobertura))) {
    errors.push("La cobertura seleccionada no es valida.");
  }

  // VALIDAR CAMPO "PRECIO"
  if (precio && isNaN(precio) && precio <= 0) {
    errors.push(
      "Si quieres filtrar por precio debes poner un precio valido (Mayor a 0)."
    );
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
          tipoSeg?.type ?? "No aplica."
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

// CARGAR DATOS
const cargarDatos = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const responseSeguros = await fetch('../json/tiposeguro.json');
      const responsePlanes = await fetch('../json/planes.json');
      const responseCoberturas = await fetch ('../json/coberturas.json');
      const responseAseguradoras = await fetch ('../json/aseguradoras.json');
  
      tipoDeSeguros = await responseSeguros.json();
      planes = await responsePlanes.json();
      coberturas = await responseCoberturas.json();
      aseguradoras = await responseAseguradoras.json();
      
      resolve(asignarOptions());
    } catch (error) {
      console.error('Error al cargar los datos: ', error);
      reject(error);
    };
  });
};

// ASIGNAR OPCIONES
const asignarOptions = () => {
  // OPCIONES TIPO DE SEGURO
  let optionsTipoSeguro = `<option class="text-center dm-sans-normal" value="">Selecciona un tipo de seguro</option>`;

  tipoDeSeguros.forEach((tipo) => {
    optionsTipoSeguro += `<option class="text-center dm-sans-normal" value="${tipo.id}">${tipo.type}</option>`;
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
  cargarDatos();

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
      // MOSTRAR ERRORES
      mostrarErrores.classList.remove("hidden");
      msjErrorCotizacion(errores);

      return;
    } else {
      mostrarErrores.classList.add("hidden");
    }

    // MOSTRAR TABLA
    const cotizacion = function () {
      const tablaCotizacion = document.getElementById('tablaCotizacion');
      const hasClass = tablaCotizacion.classList.contains("hidden");

      if (hasClass) {
        // MOSTRAR TABLA
        tablaCotizacion.classList.remove("hidden");
        mostrarTabla(data);
        return;
      } else {
        tablaCotizacion.classList.add("hidden");
      }
    };

    cotizacion();
  });
});

