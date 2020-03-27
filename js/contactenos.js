

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
            $('#nombresContactInput').val('') ;
            $('#apellidosContactInput').val('') ;
            $('#emailContactInput').val('') ;
            $('#asuntoContactInput').val('') ;
            $('#mensajeContactInput').val('') ;
        },
        error: function(errores) {
            alert("Falla en el servidor, intente más tarde");
            console.log(errores);
        }
    });
}

function comentar(){
    var nombres = $("#nombresContactInput").val().toUpperCase();
    var apellidos = $("#apellidosContactInput").val().toUpperCase();
    var email = $("#emailContactInput").val().toLowerCase();
    var asunto = $("#asuntoContactInput").val();
    var mensaje = $("#mensajeContactInput").val();

    if (validarEmail(email) && validarAsunto(asunto) && validarMensaje(mensaje)) {
        cargarMensaje(nombres, apellidos, email, asunto, mensaje);
    }
    
}

document.getElementById("btnEnviar").addEventListener('click', comentar, false);