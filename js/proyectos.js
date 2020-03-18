function cargarTitulo(){
    var currentUrl = document.URL;
    var urlPart = currentUrl.split('#')[1];
    $.ajax({
        // producción
        url: 'https://btmapi.herokuapp.com/api/v1/categorias/tag/'+urlPart,
        // desarrollo
        // url: 'http://127.0.0.1:3000/api/v1/categorias/tag/'+urlPart,

        success: function(resultado) {
            temp = resultado[0].nombre;   
            h1Categ = document.getElementById("categoria")
            h1Categ.innerText = temp;

            cargarDescripcion(temp);
        },
        error: function(errores) {
            console.log("errores");
            console.log(errores);
        }
    });
}



function cargarDescripcion(titulo) {
    $.ajax({
        // producción
        url: 'https://btmapi.herokuapp.com/api/v1/categorias/',
        // desarrollo
        // url: 'http://127.0.0.1:3000/api/v1/categorias/',

        success: function(resultado) {
            var p = document.getElementById('descripCateg');
            for (var i = 0; i < resultado.length; i++) {
                let nombre = resultado[i]['nombre'];
                let descripcion = resultado[i]['descripcion'];

                if (nombre == titulo) {
                    p.innerText = descripcion
                }
            }
        },
        error: function(errores) {
            console.log("errores");
            console.log(errores);
        }
    });

}

document.addEventListener('DOMContentLoaded', function() {
    cargarTitulo();
})