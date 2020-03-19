
function validarEmail(email) {
    // https://www.w3resource.com/javascript/form/email-validation.php
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)){
        return (true)
    }
    alert("Ingresaste un email inválido!")
    return (false)
}

function limpiarInput(id){    
    $(id).val('') ;
}

function cargarSuscriptor(email){
    $.ajax({
        // producción
        url: 'https://btmapi.herokuapp.com/api/v1/suscriptores',
        // desarrollo
        // url: 'http://127.0.0.1:3000/api/v1/suscriptores',
        type: "POST",        
        data: {emailInput:email},
        success: function(resultado) {
            alert(email + " te acabas de suscribir!");
        },
        error: function(errores) {
            if (errores["responseJSON"]["detail"].includes("already exists") ) {
                alert("Ya te encuentras suscrito " + email);
            }else{
                alert("Error! " + errores);
            }

        }
    });
}

$(document).ready(function(){
    if ($("body").height() <= $(window).height() ) {
        $("footer").css({
            "position":"absolute",
            "bottom":"0px",
            "width":"100%"
        })
    }
});


function suscripcion(){
    var email = $("#emailInput").val().toLowerCase();

    if (validarEmail(email)) {
        cargarSuscriptor(email)
    }
    limpiarInput("#emailInput");
}

document.getElementById("btnSuscribirse").addEventListener('click', suscripcion, false);

$('#emailInput').keypress(function(event){
    var keycode = (event.keyCode ? event.keyCode : event.which);
    if(keycode == '13'){
        suscripcion();
    }
    //Stop the event from propogation to other handlers
    //If this line will be removed, then keypress event handler attached 
    //at document level will also be triggered
    event.stopPropagation();
});





