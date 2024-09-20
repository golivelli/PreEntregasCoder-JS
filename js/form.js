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

// MANEJO DE PROMESA
function contacUser (data) {
  return new Promise ((resolve, reject) => {
    const errores = validarCampos(data);

    if (errores.length > 0) {
      return reject(errores);
    }

    let dataUser = JSON.parse(localStorage.getItem("dataUser") ?? "[]"); 

    dataUser.push({ ...data, id : dataUser.length + 1 });

    // ENVIAR DATOS A LOCAL STORAGE
    localStorage.setItem("dataUser", JSON.stringify(dataUser));
    console.log("Datos Guardados:", dataUser);

    resolve({
      status : 201,
      user : { ...data, id : dataUser.length + 1 },
      message : "Datos enviados correctamente.",
    });
  });
}

// MOSTRAR MENSAJE ERROR
const msjError = function (mensajes) {
  const divErrores = document.getElementById("mostrarErrores");
  divErrores.innerHTML = "";

  mensajes.forEach(function (mensaje) {
    const p = document.createElement("p");
    p.textContent = mensaje;
    divErrores.appendChild(p);
  });
};

// MOSTRAR FORMULARIO ENVIADO
const formEnviado = function (submit) {
  const divEnviado = document.getElementById("mostrarEnviado");
  divEnviado.innerHTML = "";

  submit.forEach(function (sub) {
    const p = document.createElement("p");
    p.textContent = sub;
    divEnviado.appendChild(p);
  });
};

// LIMPIAR NOTIFICACIONES
const limpiarNotificaciones = function () {
  const divErrores = document.getElementById("mostrarErrores");
  const divEnviado = document.getElementById("mostrarEnviado");

  // LIMPIAR ERRORES
  if (divErrores) {
    divErrores.innerHTML = "";
    submitError.classList.add("hidden"); 
  }

  // LIMPIAR MENSAJES DE ÉXITO
  if (divEnviado) {
    divEnviado.innerHTML = "";
    msjSubmit.classList.add("hidden"); 
  }
};

// EVENTO "SUBMIT" FORMULARIO
form.addEventListener("submit", async function (event) {
  event.preventDefault();
  limpiarNotificaciones();

  // GUARDAR DATOS
  const data = Object.fromEntries((new FormData(form)).entries());

  const {
    nombre,
    apellido, 
    telefono, 
    email,
    mensaje
  } = data;

  try{
    const response = await contacUser(data);

    if (response.error){
      throw response;
    }

    Swal.fire({
      title: 'Datos enviados con éxito.',
      text: 'Has completo los campos solicitados con éxito.',
      icon: 'success',
      confirmButtonText: 'Aceptar'
    });

    console.log(response);
  } catch (error){
    Swal.fire({
      icon: "error",
      title: "Ups...",
      text: "¡Algo salió mal! Complete el formulario correctamente.",
    });

    console.log(error);
  }

  const errores = validarCampos(data);

  // MOSTRAR "ERRORES"
  if (errores.length > 0) {
    // MOSTRAR ERRORES
    submitError.classList.remove("hidden");
    return msjError(errores);

  } else {
    submitError.classList.add("hidden");
  }

  // MOSTRAR "FORMULARIO ENVIADO"
  const sent = function () {
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

