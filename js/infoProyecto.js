function cargarInfo(){
    var currentUrl = document.URL;
    var id = currentUrl.split('#')[1];
    $.ajax({
        // producción
        url: 'https://btmapi.herokuapp.com/api/v1/proyectos/id/'+id,
        // desarrollo
        // url: 'http://127.0.0.1:3000/api/v1/proyectos/id/'+id,

        success: function(resultado) {

            idProy = resultado[0]["idproy"];
            nombre = resultado[0]["nombre"];
            descripcion = resultado[0]["descripcion"];
            

            nombreProy = document.getElementById("nombreProy")
            descripProy = document.getElementById("descripProy")

            nombreProy.innerText = nombre
            descripProy.innerText = descripcion
            
        },
        error: function(errores) {
            console.log("errores");
            console.log(errores);
        }
    });
}

function cargarImgs(){
    var currentUrl = document.URL;
    var id = currentUrl.split('#')[1];
    $.ajax({
        // producción
        url: 'https://btmapi.herokuapp.com/api/v1/imagenes/idproy/'+id,
        // desarrollo
        // url: 'http://127.0.0.1:3000/api/v1/imagenes/idproy/'+id,

        success: function(resultado) {

            imgsProy = document.getElementById("imgsProy")

            for (let i = 0; i < resultado.length; i++) {
                pathimg = resultado[i]["pathimg"];

                a = document.createElement("a");
                a.setAttribute("href", pathimg);

                img = document.createElement("img");
                img.setAttribute("class","imgProy")
                img.setAttribute("src",pathimg)

                a.appendChild(img)

                imgsProy.appendChild(a);                
            }
            
        },
        error: function(errores) {
            console.log("errores");
            console.log(errores);
        }
    });
}


function cargarComentarios(){
    var currentUrl = document.URL;
    var id = currentUrl.split('#')[1];
    $.ajax({
        // producción
        url: 'https://btmapi.herokuapp.com/api/v1/comentarios/idproy/'+id,
        // desarrollo
        // url: 'http://127.0.0.1:3000/api/v1/comentarios/idproy/'+id,

        success: function(resultado) {

            divComentarios = document.getElementById("divComentarios")

            for (let i = 0; i < resultado.length; i++) {

                nombres  = resultado[i]["nombres"];
                comentario  = resultado[i]["comentario"];

                div = document.createElement("div");
                div.setAttribute("class","alert alert-info");
                div.setAttribute("role","alert");

                h4 = document.createElement("h4");
                h4.setAttribute("class","alert-heading");
                h4.innerText = nombres;

                hr = document.createElement("hr");

                p = document.createElement("p");
                p.setAttribute("class","mb-0");
                p.innerText = comentario;

                div.appendChild(h4);
                div.appendChild(hr);
                div.appendChild(p);

                divComentarios.appendChild(div);
            }
            
        },
        error: function(errores) {
            console.log("errores");
            console.log(errores);
        }
    });
}


function validarEmail(email) {
    // https://www.w3resource.com/javascript/form/email-validation.php
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)){
        return (true)
    }
    alert("Ingresaste un email inválido!")
    return (false)
}
function validarComentario(comentario) {
    if (! (comentario.trim() == "")){
        return (true)
    }
    alert("Comentario no puede estar vacío!")
    return (false)
}

function validarNombres(nombres) {
    if (! (nombres.trim() == "")){
        return (true)
    }
    alert("Nombres no puede estar vacío!")
    return (false)
}


function cargarComentario(comentario, nombres, email, idproy){
    $.ajax({
        // producción
        url: 'https://btmapi.herokuapp.com/api/v1/comentarios',
        // desarrollo
        // url: 'http://127.0.0.1:3000/api/v1/comentarios',
        type: "POST",        
        data: {
            emailInput:email,
            nombresInput:nombres,
            comentarioInput:comentario,
            idproyInput:idproy
        },
        success: function(resultado) {
            alert( "Comentario enviado correctamente!");
            $('#comentarioComInput').val('') ;
            $('#nombresComInput').val('') ;
            $('#emailComInput').val('') ;
        },
        error: function(errores) {
            alert("Falla en el servidor, intente más tarde");
            console.log(errores);
        }
    });
}


function comentar(){
    var comentario = $("#comentarioComInput").val();
    var nombres = $("#nombresComInput").val();
    var email = $("#emailComInput").val().toLowerCase();

    var currentUrl = document.URL;
    var idproy = currentUrl.split('#')[1];
    

    if (validarEmail(email) && validarNombres(nombres) && validarComentario(comentario)) {
        cargarComentario(comentario, nombres, email, idproy);
    }
    
}


document.getElementById("btnComEnviar").addEventListener('click', comentar, false);

document.addEventListener('DOMContentLoaded', function() {
    cargarInfo();
    cargarImgs();
    cargarComentarios();
})