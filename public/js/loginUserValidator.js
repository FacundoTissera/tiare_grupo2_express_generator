window.addEventListener('load',function(){
    
    const formularioLogin = document.querySelector('#formularioLogin');
    const inputs = document.querySelectorAll('#formularioLogin input')
    const  showPassword = document.querySelector('.show-password');
    //console.log(inputs);
    const expresiones = {
        email: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
        password: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/,//8 a 15 digitos tiene que tener una mayuscula y un numero minimo.
    };

    const camposForm = {
        grupo__email: false,
        grupo__password: false
    };

    const validarFormulario = (e)=>{
        //console.log(e.target.name); 
        switch (e.target.name) {
            case 'email':
                if (expresiones.email.test(e.target.value)) {
                    document.getElementById('grupo__email').classList.remove('formulario_grupo-incorrecto');
                    document.getElementById('grupo__email').classList.add('formulario_grupo-correcto');
                    document.querySelector('#grupo__email i').classList.remove('fa-times-circle');
                    document.querySelector('#grupo__email i').classList.add('fa-check-circle');
                    document.querySelector('#grupo__email .formulario_input-error').classList.remove('formulario_input-error-activo');
                    camposForm['grupo__email'] = true;
                }else{
                    document.getElementById('grupo__email').classList.add('formulario_grupo-incorrecto');
                    document.getElementById('grupo__email').classList.remove('formulario_grupo-correcto');
                    document.querySelector('#grupo__email i').classList.add('fa-times-circle');
                    document.querySelector('#grupo__email i').classList.remove('fa-check-circle');
                    document.querySelector('#grupo__email .formulario_input-error').classList.add('formulario_input-error-activo');
                    camposForm['grupo__email'] = false;
                }
                break;
            case 'password':
                if (expresiones.password.test(e.target.value)) {
                    document.getElementById('grupo__password').classList.remove('formulario_grupo-incorrecto');
                    document.getElementById('grupo__password').classList.add('formulario_grupo-correcto');
                    document.querySelector('#grupo__password i').classList.remove('fa-times-circle');
                    document.querySelector('#grupo__password i').classList.add('fa-check-circle');
                    document.querySelector('#grupo__password .formulario_input-error').classList.remove('formulario_input-error-activo');
                    camposForm['grupo__password'] = true;
                }else{
                    document.getElementById('grupo__password').classList.add('formulario_grupo-incorrecto');
                    document.getElementById('grupo__password').classList.remove('formulario_grupo-correcto');
                    document.querySelector('#grupo__password i').classList.add('fa-times-circle');
                    document.querySelector('#grupo__password i').classList.remove('fa-check-circle');
                    document.querySelector('#grupo__password .formulario_input-error').classList.add('formulario_input-error-activo');
                    camposForm['grupo__password'] = false;
                }
        
            default:
                break;
        } 
    }

    showPassword.addEventListener('click', ()=>{
        password1 = document.querySelector('.password1');
        if ( password1.type === "text" ) {
            password1.type = "password"
            showPassword.classList.remove('fa-eye-slash');
        }else{
            password1.type = "text"
            showPassword.classList.toggle("fa-eye-slash");
        }
    })

    inputs.forEach((input)=>{
        input.addEventListener('keyup', validarFormulario);
        input.addEventListener('blur', validarFormulario);
        })
    

    formularioLogin.addEventListener("submit",(e)=>{
        if (
            camposForm.grupo__email &&
            camposForm.grupo__password
            ) 
        {

        }else{
            e.preventDefault()
        }
    })

})
// llamo a los id del div de cada elemento

// })   const camposForm = {
//         emailUsuario:false,
//         contraseniaUsuario:false
//     }

//     const validarFormularioLogin = (e) =>{
//         //identifico los name de el login console.log(e.target.name);
//         switch (e.target.name) {
//             case 'email':
//                 validarCampo(expresiones.email, e.target, "emailUsuario");
//                 break;
        
//             case 'password':
//                 validarCampo(expresiones.password, e.target, "contraseniaUsuario");
//                 break;
        
//             default:
//                 break;
//         }
//     };

//     const validarCampo = (expresion, input, campo) =>{
//         if (expresion.test(input.value)) {
//                 document
//                 .getElementById(`${campo}`)
//                 .classList.remove("formulario_grupo-incorrecto");
//             document
//                 .getElementById(`${campo}`)
//                 .classList.add("formulario_grupo-correcto");
//             document.querySelector(`#${campo} i`).classList.add("fa-check-circle");
//             document.querySelector(`#${campo} i`).classList.remove("fa-times-circle");
//             document
//                 .querySelector(`#${campo} .formulario_input-error`)
//                 .classList.remove("formulario_input-error-activo");
//             camposForm[campo] = true;
//             } else {
//                 document
//             .getElementById(`${campo}`)
//             .classList.add("formulario_grupo-incorrecto");
//         document
//             .getElementById(`${campo}`)
//             .classList.remove("formulario_grupo-correcto");
//         document.querySelector(`#${campo} i`).classList.remove("fa-check-circle");
//         document.querySelector(`#${campo} i`).classList.add("fa-times-circle");
//         document
//             .querySelector(`#${campo} .formulario_input-error`)
//             .classList.add("formulario_input-error-activo");
//         camposForm[campo] = false;
//         }
//     };
//     inputs.forEach((input) => {
//             input.addEventListener("keyup", validarFormularioLogin);
//             input.addEventListener("blur", validarFormularioLogin);
        
//     });
//     formularioLogin.addEventListener('submit', (e)=>{
//         e.preventDefault();
//         if (camposForm.emailUsuario && camposForm.contraseniaUsuario) {
//             formularioLogin.submit();
//         } else {
//             document
//             .getElementById("formulario__mensaje")
//             .classList.add("formulario__mensaje-activo");
//         }
//     })