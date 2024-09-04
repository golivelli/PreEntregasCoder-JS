// PRE-ENTREGA 3

// FORMULARIO
// DECLARACIÓN DE VARIABLES
const nombreElement = document.getElementById(`nombre`);
const apellidoElement = document.getElementById(`apellido`);
const telefonoElement = document.getElementById(`telefono`);
const emailElement = document.getElementById(`email`);
const mensajeElement = document.getElementById("mensaje");

const msjSubmit = document.getElementById("mostrarEnviado");
const submitError = document.getElementById("mostrarErrores");

const enviado = [`Los datos fueron enviados con éxito.`];

const formulario = document.getElementById("form");

// MENSAJE ERROR
const msjError = function (mensajes) {
  const divErrores = document.getElementById("mostrarErrores");
  divErrores.innerHTML = "";
  console.log(mensajes);

  mensajes.forEach(function (mensaje) {
    const p = document.createElement("p");
    p.textContent = mensaje;
    divErrores.appendChild(p);
  });
};

// FORMULARIO ENVIADO
const formEnviado = function (submit) {
  const divEnviado = document.getElementById("mostrarEnviado");
  divEnviado.innerHTML = "";

  submit.forEach(function (sub) {
    const p = document.createElement("p");
    p.textContent = sub;
    divEnviado.appendChild(p);
  });
};

// VALIDAR CAMPOS
function validarCampos(data) {
  let errores = [];
  const regularTelefono = /^[0-9]+$/;
  const regularEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const { nombre, telefono, email } = data;

  // VALIDAR CAMPO "NOMBRE"
  if (nombre.trim() === "" || nombre === null || nombre === undefined) {
    errores.push(
      `El campo nombre no puede estar vacío, por favor ingrese su nombre.`
    );
  }

  // VALIDAR CAMPO "TELÉFONO"
  if (
    telefono === null ||
    telefono === undefined ||
    !regularTelefono.test(telefono)
  ) {
    errores.push(
      `El campo telefono no puede estar vacío y ademas debe contener solo caracteres numéricos.`
    );
  }

  // VALIDAR CAMPO "EMAIL"
  if (email === null || email === undefined || !regularEmail.test(email)) {
    errores.push(
      `El campo email no puede estar vacío, por favor ingrese correctamente su email.`
    );
  }

  // RETORNAR ERRORES
  return errores;
}

// EVENTO "SUBMIT" FORMULARIO
formulario.addEventListener("submit", function (event) {
  event.preventDefault();

  const data = {
    nombre: nombreElement.value,
    apellido: apellidoElement.value,
    telefono: telefonoElement.value,
    email: emailElement.value,
    mensaje: mensajeElement.value,
  };

  const errores = validarCampos(data);

  if (errores.length > 0) {
    // MOSTRAR ERRORES
    submitError.classList.remove("hidden");
    msjError(errores);

    return;
  } else {
    submitError.classList.add("hidden");
  }

  // GUARDAR DATOS
  const datosFormulario = {
    nombre: nombre.value,
    apellido: apellido.value,
    telefono: telefono.value,
    email: email.value,
    mensaje: mensaje.value,
  };

  // ENVIAR DATOS A LOCAL STORAGE
  localStorage.setItem("datosFormulario", JSON.stringify(datosFormulario));
  console.log("Datos Guardados:", datosFormulario);

  // MOSTRAR "FORMULARIO ENVIADO"
  const sent = function () {
    const msjSubmit = document.getElementById("mostrarEnviado");
    const hasClass = msjSubmit.classList.contains("hidden");

    if (hasClass) {
      msjSubmit.classList.remove("hidden");
    } else {
      msjSubmit.classList.add("hidden");
    }
  };

  sent();
  formEnviado(enviado);
});
