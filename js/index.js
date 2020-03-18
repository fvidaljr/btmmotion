

function crearTarjeta(src, href){
    var div1 = document.createElement('div');
    div1.className = "col mb-4";

    var div2 = document.createElement('div');
    div2.className = "card";
    var a = document.createElement("a");
    a.setAttribute("href", href);
    var img = document.createElement("img");
    img.className = "card-img-top";
    img.src = src;

    a.appendChild(img);
    div2.appendChild(a);
    div1.appendChild(div2);

    return div1;
}


async function cargarCategorias(){
    

    await $.ajax({
        // producción
        url: 'https://btmapi.herokuapp.com/api/v1/categorias',
        // desarrollo
        // url: 'http://127.0.0.1:3000/api/v1/categorias/',
    
        success: function(resultado) {
            child1 = document.getElementById("categoriasFirstChild");
            for (var i = 0; i < resultado.length; i++) {
                src = resultado[i]["sourceimg"];
                href="./proyectos.html#" + resultado[i]["tag"];
                let div = crearTarjeta(src, href)
                child1.appendChild(div)
            }
        },
        error: function(errores) {
            console.log("errores");
            console.log(errores);
        }
    });
}


document.addEventListener('DOMContentLoaded', function() {
    cargarCategorias();
})







