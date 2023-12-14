class Noticias {

    readInputFile(files) {
        let archivo = files[0];
        let tipoTexto = /text.*/;
        if (archivo.type.match(tipoTexto)) {
            var fr = new FileReader();
            fr.onload = function (evento) {
                let articulos = fr.result.split("\n");
                let main = $("main")
                articulos.forEach(element => {
                    let noticia = element.split("_");
                    let article = $("<article></article>");
                    article.append("<h3>" + noticia[0] + "</h3>");
                    article.append("<h4>" + noticia[1] + "</h4>");
                    article.append("<p>" + noticia[2] + "</p>");
                    article.append("<p>" + noticia[3] + "</p>");
                    main.append(article);
                });
            }
            fr.readAsText(archivo);
        }
    }

    insertarNoticialManualmente() {
        let article = $("<article></article>");
        let titulo = $("<h3></h3>").text($('input[name="Titulo"]').val());
        let entradilla = $("<h4></h4>").text($('input[name="Entradilla"]').val());
        let texto = $("<p></p>").text($('textarea[name="Noticia"]').val());
        let autor = $("<p></p>").text($('input[name="Autor"]').val());
        article.append(titulo).append(entradilla).append(texto).append(autor);
        $('main').append(article);
    }
}

