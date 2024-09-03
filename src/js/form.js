// PRE-ENTREGA 2
// COTIZADOR DE SEGUROS

// FORMULARIO
// Validar Campo Nombre. 
const validarCampoVacio = function(campo, nombreCampo){
  if(campo.trim() === ''){
    return `El campo "${nombreCampo}" no puede estar vacío, por favor ingrese lo solicitado.`;
  }
  return "";
};

// Validar Campo Telefono.
const validarTel = function (tel){
  const regularTelefono = /^[0-9]+$/; 
  if(!regularTelefono.test(tel)){
    return `El telefono debe contener solo caracteres numéricos.`;
  };
  return ``;
};

// Validar Campo Email.
const validarMail = function(email){
  const regularEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if(!regularEmail.test(email)){
    return `El formato del mail es incorrecto.`;
  };
  return ``;
};

// Función Para Mostrar Errores.
const mostrarErrores = function(mensajes) {
  const divErrores = document.getElementById('mostrarErrores');
  divErrores.innerHTML = ''; 

  mensajes.forEach(function(mensaje) {
    const p = document.createElement('p');
    p.textContent = mensaje;
    divErrores.appendChild(p);
  });
};

// Función Para Mostrar "Enviado"
const mostrarEnviado = function(submit){
  const divEnviado = document.getElementById('mostrarEnviado');
  divEnviado.innerHTML = '';

  const p = document.createElement('p');
  p.textContent = submit;
  divEnviado.appendChild(p);
};

// Btn-Contactame
const btnContacto = document.getElementById('idBtnSubmit');
// DIV`s 
const msjSubmit = document.getElementById('mostrarEnviado');
const submitError = document.getElementById('mostrarErrores');

// Alternar visibilidad de "mostrarEnviado"
msjSubmit.addEventListener('click', function(){
  const mostrarEnviado = document.getElementById('mostrarEnviado');
  const hasClass = msjSubmit.classList.contains('hidden');

  if(hasClass){
    mostrarEnviado.classList.remove('hidden');
  } else {
    mostrarEnviado.classList.add('hidden');
  };
})

// Alternar visibilidad de "mostrarErrores"
submitError.addEventListener('click', function(){
  const mostrarErrores = document.getElementById('mostrarErrores');
  const hasClass = submitError.classList.contains('hidden');

  if(hasClass){
    mostrarErrores.classList.remove('hidden');
  } else {
    mostrarErrores.classList.add('hidden');
  };
})

const formulario = document.getElementById('form');

formulario.addEventListener('submit', function(event) {
  // Prevenir que el formulario se envíe y la página se recargue.
  event.preventDefault();

  // Valores Inputs.
  const nombre = document.getElementById(`nombre`).value;
  const apellido = document.getElementById(`apellido`).value;
  const telefono = document.getElementById(`telefono`).value;
  const email = document.getElementById(`email`).value;
  const mensaje = document.getElementById('mensaje').value;

  // Validar Campo (Telefono - Email).
  const validarTelefono = validarTel(telefono);
  const validarEmail = validarMail(email);

  // Validar los Campos (Vacios).
  const nombreVacio = validarCampoVacio(nombre, "Nombre");
  const apellidoVacio = validarCampoVacio(apellido, "Apellido");
  const telefonoVacio = validarCampoVacio(telefono, "Teléfono");
  const emailVacio = validarCampoVacio(email, "Email");
  const mensajeVacio = validarCampoVacio(mensaje, "Mensaje");

  // Almacenar Errores.
  const errores = [];

  // Mensaje Enviado
  const enviado = `Los datos fueron enviados con éxito.`;

  // Agregar Mensajes de Error al Array.
  if (nombreVacio) errores.push(nombreVacio);
  if (apellidoVacio) errores.push(apellidoVacio);
  if (telefonoVacio) errores.push(telefonoVacio);
  if (emailVacio) errores.push(emailVacio);
  if (mensajeVacio) errores.push(mensajeVacio);
  if (validarTelefono) errores.push(validarTelefono);
  if (validarEmail) errores.push(validarEmail);

  // Mostrar Errores o Continuar con el Envío de Datos y Confirmación de msj Enviado.
  if (errores.length > 0){
    mostrarErrores(errores);
  } else {
    // Si no hay errores, guardar los datos en localStorage o enviarlos.
    const datosFormulario = {
      nombre: nombre,
      apellido: apellido,
      telefono: telefono,
      email: email,
      mensaje: mensaje
    };
    localStorage.setItem('datosFormulario', JSON.stringify(datosFormulario));
    console.log('Datos guardados:', datosFormulario);

    mostrarEnviado(enviado);

    // Limpiar los mensajes de error si se guardan los datos correctamente.
    mostrarErrores([]);
  };
});