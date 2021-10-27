const formulario = document.getElementById('formularioProducto');
const inputsProduct = document.querySelectorAll('#formularioProducto input');


const expresiones = {
	usuario: /^[a-zA-Z0-9\_\-]{4,16}$/, // Letras, numeros, guion y guion_bajo
	nombre: /^[a-zA-ZÀ-ÿ\s]{1,40}$/, // Letras y espacios, pueden llevar acentos.
	password: /^.{4,12}$/, // 4 a 12 digitos.
	email: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
	numeros: /^\d{7,14}$/,// 7 a 14 numeros.
	codigoPostal:/^\d{0,4}$/,
	imagen: /(\.jpg|\.jpeg|\.png|\.gif)$/
};

const validarFormulario = (e) =>{
    switch (e.target.name) {
        case 'nombre':
            validarCampo(expresiones.nombre, e.target, 'nombreProducto');
        break;
        case 'fotoPrinc':
            validarCampo();

        break;
        case 'descripcion':
           validarCampoDescripcion(expresiones.nombre, e.target, 'descripcion');       

        break;
        case 'precio':
            validarCampo();

        break;
    }
};

const validarCampo = (expresion, input, campo) => {
    if(expresion.test(input.value)){
        document.getElementById("grupo__nombreProducto").classList.remove('formulario__grupo-incorrecto');
        document.getElementById("grupo__nombreProducto").classList.add('formulario__grupo-correcto');
        document.querySelector("#grupo__nombreProducto i").classList.add('fa-check-circle');
        document.querySelector("#grupo__nombreProducto i").classList.remove('fa-times-circle');
        document.querySelector("#grupo__nombreProducto .formulario__input-error").classList.remove('formulario__input-error-activo');
    }else {
        document.getElementById("grupo__nombreProducto").classList.add('formulario__grupo-incorrecto');
        document.getElementById("grupo__nombreProducto").classList.remove('formulario__grupo-correcto');
        document.querySelector("#grupo__nombreProducto i").classList.add('fa-times-circle');
        document.querySelector("#grupo__nombreProducto i").classList.remove('fa-check-circle');
        document.querySelector("#grupo__nombreProducto .formulario__input-error").classList.add('formulario__input-error-activo');

    }
}
const validarCampoDescripcion = (expresion, input, campo) => {
    if(expresion.test(input.value)){
        document.getElementById("grupo__descripcion").classList.remove('formulario__grupo-incorrecto');
        document.getElementById("grupo__descripcion").classList.add('formulario__grupo-correcto');
        document.querySelector("#grupo__descripcion i").classList.add('fa-check-circle');
        document.querySelector("#grupo__descripcion i").classList.remove('fa-times-circle');
        document.querySelector("#grupo__descripcion .formulario__input-error").classList.remove('formulario__input-error-activo');
    }else {
        document.getElementById("grupo__descripcion").classList.add('formulario__grupo-incorrecto');
        document.getElementById("grupo__descripcion").classList.remove('formulario__grupo-correcto');
        document.querySelector("#grupo__descripcion i").classList.add('fa-times-circle');
        document.querySelector("#grupo__descripcion i").classList.remove('fa-check-circle');
        document.querySelector("#grupo__descripcion .formulario__input-error").classList.add('formulario__input-error-activo');

    }
} 

const archivo = function () {
    let fileInput = document.getElementById("foto-principal");

    let filePath = fileInput.value;

    let allowedExtensions = /(\.jpg|\.jpeg|\.png|\.gif)$/i;

    if (!allowedExtensions.exec(filePath)) {
      console.log("error");
      fileInput.value = "";

      return alert("Los formatos validos son: (JPG, JPEG, PNG, GIF).")
      ;
    }
  };
inputsProduct.forEach((input) => { if (input.type != "file") {
    input.addEventListener("keyup", validarFormulario);
    input.addEventListener("blur", validarFormulario);
  } else {
    input.addEventListener("change", archivo);
  }
});

formulario.addEventListener('submit', (e) => {
    e.preventDefault();
});