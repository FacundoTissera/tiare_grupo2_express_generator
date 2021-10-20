window.addEventListener("load", function(){

    let formulario = document.querySelector('form.formulario-nuevo-producto');

    formulario.addEventListener("submit", function(){
      //  e.preventDefault();

        let campoNombre = document.querySelector('input.input-nombre');

        if(campoNombre.value == ""){
            alert("El nombre del producto es obligatorio");
        } else if (campoNombre.value.length < 5){
            alert("El nombre del producto debe tener al menos 5 caracteres")
        }

        let campoDescripcion = document.querySelector('textarea.input-nombre');

        if(campoDescripcion.value.length < 20){
            alert("La descripción del producto debe tener al menos 20 caracteres");
        }

        let campoFoto = document.querySelector('input.foto-principal');
        
        if(campoFoto.value !== ".JPG, .JPEG, .PNG, .GIF"){
            alert("Los formatos validos son: (JPG, JPEG, PNG, GIF).")
        }

    });
})