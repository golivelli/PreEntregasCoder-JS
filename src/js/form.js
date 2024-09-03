// PRE-ENTREGA 3

// FORMULARIO
// Validar Campo (Nombre). 
const validarCampoVacio = function(campo, nombreCampo){
  if(campo.trim() === ''){
    return `El campo "${nombreCampo}" no puede estar vacío, por favor ingrese lo solicitado.`;
  }
  return;
};

// Validar Campo (Telefono).
const validarTel = function (tel){
  const regularTelefono = /^[0-9]+$/; 
  if(!regularTelefono.test(tel)){
    return `El telefono debe contener solo caracteres numéricos.`;
  };
  return ``;
};

// Validar Campo (Email).
const validarMail = function(email){
  const regularEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if(!regularEmail.test(email)){
    return `El formato del mail es incorrecto.`;
  };
  return ``;
};

// MENSAJE ERROR
const msjError = function(mensajes) {
  const divErrores = document.getElementById('mostrarErrores');
  divErrores.innerHTML = ''; 

  mensajes.forEach(function(mensaje) {
    const p = document.createElement('p');
    p.textContent = mensaje;
    divErrores.appendChild(p);
  });
};

// MENSAJE ENVIADO
const msjEnviado = function(submit){
  const divEnviado = document.getElementById('mostrarEnviado');
  divEnviado.innerHTML = '';

  const p = document.createElement('p');
  p.textContent = submit;
  divEnviado.appendChild(p);
};

// VALIDAR CAMPOS
function validarCamposVacios (data) {
  let errors = [];
  // const {
  // }

  return errors;
}

// DECLARACIÓN DE VARIABLES
const nombreElement = document.getElementById(`nombre`);
const apellidoElement = document.getElementById(`apellido`);
const telefonoElement = document.getElementById(`telefono`);
const emailElement = document.getElementById(`email`);
const mensajeElement = document.getElementById('mensaje');

const msjSubmit = document.getElementById('mostrarEnviado');
const submitError = document.getElementById('mostrarErrores');

const enviado = `Los datos fueron enviados con éxito.`;

const formulario = document.getElementById('form');

// EVENTO "SUBMIT" FORMULARIO
formulario.addEventListener('submit', function(event) {
  event.preventDefault();

  const data = {
    nombre : nombreElement.value,
    apellido : apellidoElement.value,
    telefono : telefonoElement.value,
    email : emailElement.value,
    mensaje : mensajeElement.value
  }

  const errores = validarCamposVacios(data);
  
  if(errores.length > 0) {
    // MOSTRAR ERRORES
    const errors = function(){
      const mostrarErrores = document.getElementById('mostrarErrores');
      const hasClass = submitError.classList.contains('hidden');

      if(hasClass){
        mostrarErrores.classList.remove('hidden');
      } else {
        mostrarErrores.classList.add('hidden');
      };
    };

    errors();
    msjError(errores);

    return;
  };

  // GUARDAR DATOS EN LOCAL STORAGE
  const datosFormulario = {
    nombre: nombre,
    apellido: apellido,
    telefono: telefono,
    email: email,
    mensaje: mensaje
  };

  // Enviar datos al Local Storage
  localStorage.setItem('datosFormulario', JSON.stringify(datosFormulario));
  console.log('Datos Guardados:', datosFormulario);

  // Alternar visibilidad de "mostrarEnviado"
  const sent = function(){
    const mostrarEnviado = document.getElementById('mostrarEnviado');
    const hasClass = msjSubmit.classList.contains('hidden');

    if(hasClass){
      mostrarEnviado.classList.remove('hidden');
    } else {
      mostrarEnviado.classList.add('hidden');
    };
  };

  sent();
  msjEnviado(enviado);
});



  const validarTelefono = validarTel(telefono);
  const validarEmail = validarMail(email);

  // Validar los Campos (Vacios).
  const nombreVacio = validarCampoVacio(nombre, "Nombre");
  const apellidoVacio = validarCampoVacio(apellido, "Apellido");
  const telefonoVacio = validarCampoVacio(telefono, "Teléfono");
  const emailVacio = validarCampoVacio(email, "Email");
  const mensajeVacio = validarCampoVacio(mensaje, "Mensaje");


  

  // Agregar Mensajes de Error al Array.
  if (nombreVacio) errores.push(nombreVacio);
  if (apellidoVacio) errores.push(apellidoVacio);
  if (telefonoVacio) errores.push(telefonoVacio);
  if (emailVacio) errores.push(emailVacio);
  if (mensajeVacio) errores.push(mensajeVacio);
  if (validarTelefono) errores.push(validarTelefono);
  if (validarEmail) errores.push(validarEmail);