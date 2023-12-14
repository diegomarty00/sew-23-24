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

                    let titulo = $("<h3>").text(noticia[0]).attr("data-element", "titulo");
                    let entradilla = $("<p>").text(noticia[1]).attr("data-element", "entradilla");
                    let texto = $("<p>").text(noticia[2]).attr("data-element", "texto");
                    let autor = $("<p>").text(noticia[3]).attr("data-element", "autor");

                    article.append(titulo).append(entradilla).append(texto).append(autor);
                    main.append(article);
                });
            }
            fr.readAsText(archivo);
        }
    }

    insertarNoticialManualmente() {
        let article = $("<article></article>");
        let titulo = $("<h3></h3>").text($('input[name="Titulo"]').val()).attr("data-element", "titulo");
        let entradilla = $("<h4></h4>").text($('input[name="Entradilla"]').val()).attr("data-element", "entradilla");
        let texto = $("<p></p>").text($('textarea[name="Noticia"]').val()).attr("data-element", "texto");
        let autor = $("<p></p>").text($('input[name="Autor"]').val()).attr("data-element", "autor");
        article.append(titulo).append(entradilla).append(texto).append(autor);
        $('main').append(article);

         titulo.val("");
         subtitulo.val("");
         texto.val("");
         autor.val("");
    }
}

