

function validarEmail(email) {
    // https://www.w3resource.com/javascript/form/email-validation.php
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)){
        return (true)
    }
    alert("Ingresaste un email inválido!")
    return (false)
}

function validarAsunto(asunto) {
    if (! (asunto.trim() == "")){
        return (true)
    }
    alert("Asunto no puede estar vacío!")
    return (false)
}

function validarMensaje(mensaje) {
    if (! (mensaje.trim() == "")){
        return (true)
    }
    alert("Mensaje no puede estar vacío!")
    return (false)
}



function cargarMensaje(nombres, apellidos, email, asunto, mensaje){
    $.ajax({
        // producción
        url: 'https://btmapi.herokuapp.com/api/v1/interesados',
        // desarrollo
        // url: 'http://127.0.0.1:3000/api/v1/interesados',
        type: "POST",        
        data: {
            nombresInput:nombres,
            apellidosInput:apellidos,
            emailInput:email,
            asuntoInput:asunto,
            mensajeInput:mensaje
        },
        success: function(resultado) {
            alert( "Mensaje enviado correctamente!");
            $('#nombresInput').val('') ;
            $('#apellidosInput').val('') ;
            $('#emailInput').val('') ;
            $('#asuntoInput').val('') ;
            $('#mensajeInput').val('') ;
            console.log(resultado);
        },
        error: function(errores) {
            alert("Falla en el servidor, intente más tarde");
            console.log(errores);
        }
    });
}

function comentar(){
    var nombres = $("#nombresInput").val().toUpperCase();
    var apellidos = $("#apellidosInput").val().toUpperCase();
    var email = $("#emailInput").val().toLowerCase();
    var asunto = $("#asuntoInput").val();
    var mensaje = $("#mensajeInput").val();

    if (validarEmail(email) && validarAsunto(asunto) && validarMensaje(mensaje)) {
        cargarMensaje(nombres, apellidos, email, asunto, mensaje);
    }
    
}

document.getElementById("btnEnviar").addEventListener('click', comentar, false);