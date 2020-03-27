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

            console.log(nombreProy)

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



document.addEventListener('DOMContentLoaded', function() {
    cargarInfo();
    cargarImgs();
})