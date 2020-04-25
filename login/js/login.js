function validarEmail(email) {
    // https://www.w3resource.com/javascript/form/email-validation.php
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)){
        return (true)
    }
    alert("Ingresaste un email inválido!")
    return (false)
}

function validarPassword(password) {
    // https://es.stackoverflow.com/questions/4300/expresiones-regulares-para-contrase%C3%B1a-en-base-a-una-politica
    if (/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])([A-Za-z\d$@$!%*?&]|[^ ]){8,15}$/.test(password)){
        return (true)
    }
    alert("Formato de contraseña inválido")
    return (false)
}



function enviarCredenciales(email, password){
    $.ajax({
        // // producción
        url: 'https://btmapi.herokuapp.com/api/v1/login/validar',
        // desarrollo
        // url: 'http://127.0.0.1:3000/api/v1/login/validar',
        type: "POST",        
        data: {
            emailInput:email,
            passwordInput:password,
        },
        success: function(resultado) {
            $('#emailInput').val('') ;
            $('#passInput').val('') ;
            console.log('resultado: ',resultado);
            if (resultado) {
                console.log('correcto')
                document.location.href = './../index.html';
            } else {
                alert('Credenciales inválidas')
            }
        },
        error: function(errores) {
            alert("Falla en el servidor, intente más tarde");
            console.log(errores);
        }
    });
}

function ingresar(){
    var email = $("#emailInput").val().toLowerCase();
    var pass = $("#passInput").val();

    if (validarEmail(email) && validarPassword(pass) ) {
        enviarCredenciales(email, pass);
    }
    
}

document.getElementById("btnIngresar").addEventListener('click', ingresar, false);