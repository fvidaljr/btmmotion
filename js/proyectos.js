function cargarInfo(){
    var currentUrl = document.URL;
    var urlPart = currentUrl.split('#')[1];
    $.ajax({
        // producción
        url: 'https://btmapi.herokuapp.com/api/v1/categorias/tag/'+urlPart,
        // desarrollo
        // url: 'http://127.0.0.1:3000/api/v1/categorias/tag/'+urlPart,

        success: function(resultado) {
            nombreCategoria = resultado[0].nombre;
            descripcion = resultado[0].descripcion;
            idcateg = resultado[0].idcateg;

            h1Categ = document.getElementById("categoria")
            p = document.getElementById('descripCateg');
            nodoAtributo = document.createAttribute("idcateg");
            

            h1Categ.innerText = nombreCategoria;
            p.innerText = descripcion
            nodoAtributo.value = idcateg
            h1Categ.setAttributeNode(nodoAtributo);

            $.ajax({
                // producción
                url: 'https://btmapi.herokuapp.com/api/v1/proyectos/idcateg/'+idcateg,
                // desarrollo
                // url: 'http://127.0.0.1:3000/api/v1/proyectos/idcateg/'+idcateg,
                success:function(resultado2){

                    elemento = document.querySelector("#formas ul");

                    for (let i = 0; i < resultado2.length; i++) {
                        const sourceimg = resultado2[i]["sourceimg"];
                        const idproy = resultado2[i]["idproy"];

                        var li = document.createElement('li');

                        var a = document.createElement('a');
                        a.setAttribute("href", "./infoProyecto.html#"+idproy);

                        var img = document.createElement('img');
                        img.src = sourceimg;                        

                        a.appendChild(img);
                        li.appendChild(a)

                        elemento.appendChild(li);
                    }




                }
            })

        },
        error: function(errores) {
            console.log("errores");
            console.log(errores);
        }
    });
}




document.addEventListener('DOMContentLoaded', function() {
    cargarInfo();
})