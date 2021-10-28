window.addEventListener("load", function () {
  const formularioRegister = document.querySelector("#formularioRegister");
  const inputs = document.querySelectorAll("#formularioRegister input");

  const expresiones = {
    //usuario: /^[a-zA-Z0-9\_\-]{4,16}$/, // Letras, numeros, guion y guion_bajo
    nombre: /^[a-zA-ZÀ-ÿ\s]{1,40}$/, // Letras y espacios, pueden llevar acentos.
    password: /^.{8,12}$/, // 4 a 12 digitos.
    email: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
    numeros: /^\d{7,14}$/, // 7 a 14 numeros.
    codigoPostal: /^\d{0,4}$/,
    imagen: /(\.jpg|\.jpeg|\.png|\.gif)$/,
  };

  // llamo a los id del div de cada elemento
  const camposForm = {
    nombreApellido: false,
    direccionUsuario: false,
    ciudadUsuario: false,
    ciudadUsuario: false,
    codigoPostalUsuario: false,
    telefonoUsuario: false,
    emailUsuario: false,
    contraseniaUsuario: false,
    // avatar:false
  };

  const validarFormulario = (e) => {
    //identifico los name de el register console.log(e.target.name);
    switch (e.target.name) {
      //llamo al name de cada input
      case "nombre":
        validarCampo(expresiones.nombre, e.target, "nombreApellido");
        break;
      case "direccion":
        validarCampo(expresiones.nombre, e.target, "direccionUsuario");
        break;
      case "ciudad":
        validarCampo(expresiones.nombre, e.target, "ciudadUsuario");
        break;
      case "codigoPostal":
        validarCampo(expresiones.codigoPostal, e.target, "codigoPostalUsuario");
        break;

      case "telefono":
        validarCampo(expresiones.numeros, e.target, "telefonoUsuario");
        break;

      case "email":
        validarCampo(expresiones.email, e.target, "emailUsuario");

        break;

      case "password":
        validarCampo(expresiones.password, e.target, "contraseniaUsuario");
        break;

      case "avatar":
        archivo();
        break;

      case "aceptoTerminos":
        break;

      default:
        break;
    }
  };

  const validarCampo = (expresion, input, campo) => {
    if (expresion.test(input.value)) {
      document
        .getElementById(`${campo}`)
        .classList.remove("formulario_grupo-incorrecto");
      document
        .getElementById(`${campo}`)
        .classList.add("formulario_grupo-correcto");
      document.querySelector(`#${campo} i`).classList.add("fa-check-circle");
      document.querySelector(`#${campo} i`).classList.remove("fa-times-circle");
      document
        .querySelector(`#${campo} .formulario_input-error`)
        .classList.remove("formulario_input-error-activo");
      camposForm[campo] = true;
    } else {
      document
        .getElementById(`${campo}`)
        .classList.add("formulario_grupo-incorrecto");
      document
        .getElementById(`${campo}`)
        .classList.remove("formulario_grupo-correcto");
      document.querySelector(`#${campo} i`).classList.remove("fa-check-circle");
      document.querySelector(`#${campo} i`).classList.add("fa-times-circle");
      document
        .querySelector(`#${campo} .formulario_input-error`)
        .classList.add("formulario_input-error-activo");
      camposForm[campo] = false;
    }
  };
  const archivo = function () {
    let fileInput = document.getElementById("avatar");

    let filePath = fileInput.value;

    let allowedExtensions = /(\.jpg|\.jpeg|\.png|\.gif)$/i;

    if (!allowedExtensions.exec(filePath)) {
      console.log("error");
      fileInput.value = "";
      return false;
    }
  };
  inputs.forEach((input) => {
    if (input.type != "file") {
      input.addEventListener("keyup", validarFormulario);
      input.addEventListener("blur", validarFormulario);
    } else {
      input.addEventListener("change", archivo);
    }
  });

  formularioRegister.addEventListener("submit", (e) => {
    //e.preventDefault();
    const terminos = document.getElementById("aceptoTerminos");
    if (
      camposForm.nombreApellido &&
      camposForm.telefonoUsuario &&
      camposForm.emailUsuario &&
      camposForm.direccionUsuario &&
      camposForm.contraseniaUsuario &&
      camposForm.codigoPostalUsuario &&
      camposForm.ciudadUsuario &&
      terminos.checked
    ) {
      formularioRegister.submit();
    } else {
      document
        .getElementById("formulario__mensaje")
        .classList.add("formulario__mensaje-activo");
    }
  });
});
