class Viajes {

    mapaGeoposicionado;
    colorIndex = 0;
    curSlide = 3;
    token = 'AIzaSyCCrbYGj55x3xpStJ_qDNQu9SLTiaHDbto';
    
    constructor() {
        navigator.geolocation.getCurrentPosition(this.getPosicion.bind(this), this.verErrores.bind(this));
    }

    getPosicion(posicion) {
        this.longitud = posicion.coords.longitude;
        this.latitud = posicion.coords.latitude;
        this.altitud = posicion.coords.altitude;

        this.precision = posicion.coords.accuracy;
        this.precisionAltitud = posicion.coords.altitudeAccuracy;
        this.rumbo = posicion.coords.heading;
        this.velocidad = posicion.coords.speed;
    }

    carruselSiguiente() {
        let slides = document.querySelectorAll("img[data-element='carruselImg']");
        // maximum number of slides
        let maxSlide = slides.length - 1;
        // check if current slide is the last and reset current slide
        if (this.curSlide === maxSlide) {
            this.curSlide = 0;
        } else {
            this.curSlide++;
        }
        //   move slide by -100%
        slides.forEach((slide, indx) => {
            var trans = 100 * (indx - this.curSlide);
            $(slide).css('transform', 'translateX(' + trans + '%)')
        });
    }

    carruselAnterior() {
        let slides = document.querySelectorAll("img[data-element='carruselImg']");
        // maximum number of slides
        let maxSlide = slides.length - 1;
        // check if current slide is the first and reset current slide to last
        if (this.curSlide === 0) {
            this.curSlide = maxSlide;
        } else {
            this.curSlide--;
        }

        //   move slide by 100%
        slides.forEach((slide, indx) => {
            var trans = 100 * (indx - this.curSlide);
            $(slide).css('transform', 'translateX(' + trans + '%)')
        });
    }

    verErrores(error) {
        switch (error.code) {
            case error.PERMISSION_DENIED:
                this.mensaje = "El usuario no permite la petición de geolocalización"
                break;
            case error.POSITION_UNAVAILABLE:
                this.mensaje = "Información de geolocalización no disponible"
                break;
            case error.TIMEOUT:
                this.mensaje = "La petición de geolocalización ha caducado"
                break;
            case error.UNKNOWN_ERROR:
                this.mensaje = "Se ha producido un error desconocido"
                break;
        }
    }

    verTodo(dondeVerlo) {
        var ubicacion = document.getElementById(dondeVerlo);
        var datos = '<p>' + this.mensaje + '</p>';
        datos += '<p>Longitud: ' + this.longitud + ' grados</p>';
        datos += '<p>Latitud: ' + this.latitud + ' grados</p>';
        datos += '<p>Precisión de la longitud y latitud: ' + this.precision + ' metros</p>';
        datos += '<p>Altitud: ' + this.altitude + ' metros</p>';
        datos += '<p>Precisión de la altitud: ' + this.precisionAltitud + ' metros</p>';
        datos += '<p>Rumbo: ' + this.rumbo + ' grados</p>';
        datos += '<p>Velocidad: ' + this.velocidad + ' metros/segundo</p>';
        ubicacion.innerHTML = datos;
    }
    getMapaEstaticoGoogle(dondeVerlo) {
        var ubicacion = document.getElementById(dondeVerlo);
        //URL: obligatoriamente https
        var url = "https://maps.googleapis.com/maps/api/staticmap?";
        //Parámetros
        // centro del mapa (obligatorio si no hay marcadores)
        var centro = "center=" + this.latitud + "," + this.longitud;
        //zoom (obligatorio si no hay marcadores)
        //zoom: 1 (el mundo), 5 (continentes), 10 (ciudad), 15 (calles), 20 (edificios)
        var zoom = "&zoom=15";
        //Tamaño del mapa en pixeles (obligatorio)
        var tamaño = "&size=800x600";
        //Escala (opcional)
        //Formato (opcional): PNG,JPEG,GIF
        //Tipo de mapa (opcional)
        //Idioma (opcional)
        //region (opcional)
        //marcadores (opcional)
        var marcador = "&markers=color:red%7Clabel:S%7C" + this.latitud + "," + this.longitud;
        //rutas. path (opcional)
        //visible (optional)
        //style (opcional)
        var sensor = "&sensor=false";

        this.imagenMapa = url + centro + zoom + tamaño + marcador + sensor + "&key=" + this.token;
        
        ubicacion.innerHTML = "<img src='" + this.imagenMapa + "' alt='mapa estático google' />";
    }

    getMapaDinamicoGoogle() {
        let posicion = {lat: 43.3672702, lng: -5.8502461}
        this.mapaGeoposicionado = new google.maps.Map(document.getElementById('dinamico'), {
            zoom: 13,
            center: posicion,
            mapTypeId: google.maps.MapTypeId.ROADMAP
        });

        let infoWindow = new google.maps.InfoWindow;
        infoWindow.setPosition(posicion);
        infoWindow.setContent('Ubicación actual');
        infoWindow.open(this.mapaGeoposicionado);
    }

    leerArchivoKML(files) {
        for (let i = 0; i < files.length; i++) {
            let file = files[i];
            let fr = new FileReader();
            fr.onload = this.onFileLoad.bind(this, this.mapaGeoposicionado);
            fr.readAsText(file);
        }
    }

    onFileLoad(mapa, evento) {
        const colores = ['#FF0000', '#00FF00', '#0000FF', '#FFFF00', '#FF00FF'];
        let kml = $(evento.target.result);
        let coordinates = kml.find('coordinates').text().trim().split('\n');
        let coordinatesArray = []
        let nuevoCentro;
        for (let i = 0; i < coordinates.length; i++) {
            let coord = coordinates[i];
            let [lng, lat, alt] = coord.split(",").map(parseFloat);
            coordinatesArray.push({ lat, lng, alt });
            nuevoCentro = { lat: lat, lng: lng };
        }
        let color = colores[this.colorIndex % colores.length];
        this.colorIndex += 1;
        let ruta = new google.maps.Polyline({
            path: coordinatesArray,
            geodesic: true,
            strokeColor: color,
            strokeOpacity: 1.0,
            strokeWeight: 5
        })
        ruta.setMap(this.mapaGeoposicionado);
        mapa.setCenter(nuevoCentro);
    }
    leerArchivoSVG(files) {
        let heading = $("<h4>").text("Perfiles SVG");
        let section = $("<section>").attr("data-element", "archivosSVG");
        section.append(heading);
        for (let i = 0; i < files.length; i++) {
            let file = files[i];
            let lector = new FileReader();
            lector.onload = function (evento) {
                let xml = $.parseXML(lector.result);
                // cambiarle la version al svg para que no de error el validador
                let svg = $(xml).find("svg");
                svg.attr("version", "1.1");
                section.append(svg);
            }
            lector.readAsText(file);
        }
        $("main").append(section);
    }

    leerArchivoXML(files) {
        if (window.File && window.FileReader && window.FileList && window.Blob) {
            //El navegador soporta el API File
            let archivo = files[0];
            if (archivo) {
                let lector = new FileReader();
                lector.readAsText(archivo);
                lector.onload = function (evento) {
                    let xml = $(lector.result);
                    let seccion = $("<section>").attr("data-element", "rutas");
                    let titleRutas = $("<h3>").text("Rutas");
                    seccion.append(titleRutas);
                    $('ruta', xml).each((index, ruta) => {
                        const rutaXML = $(ruta);

                        let article = $("<article>").attr("data-element", "infoRuta");

                        let nombre = $("<h4>").text(`Ruta ${index + 1}: ${rutaXML.attr("nombreRuta")}`).attr("data-element", "nombre-ruta");
                        article.append(nombre);

                        let tipo = $("<p>").text(`Tipo de ruta: ${rutaXML.find("tipoRuta").text()}`).attr("data-element", "tipo-ruta");
                        article.append(tipo);

                        let descripcion = $("<p>").text(`Descripción: ${rutaXML.find('descripcionRuta').first().text()}`).attr("data-element", "descripcion-ruta");
                        article.append(descripcion);

                        let duracion = $("<p>").text(`Duración: ${rutaXML.find('duracion').text()}`).attr("data-element", "duracion-ruta");
                        article.append(duracion);

                        let lugar = $("<p>").text(`Lugar de inicio: ${rutaXML.find('lugar').text()}`).attr("data-element", "lugar-ruta");
                        article.append(lugar);

                        let direccion = $("<p>").text(`Dirección: ${rutaXML.find('direccion').text()}/10`).attr("data-element", "direccion-ruta");
                        article.append(direccion);

                        //let fecha_inicio = $("<p>").text(`Fecha inicio: ${rutaXML.find('fecha-inicio').text()}`).attr("data-element", "fecha-inicio-ruta");
                        //article.append(fecha_inicio);

                        //let hora_inicio = $("<p>").text(`Hora inicio: ${rutaXML.find('hora-inicio').text()}`).attr("data-element", "hora-inicio-ruta");
                        //article.append(hora_inicio);

                        let medioTransporte = $("<p>").text(`Medio transporte: ${rutaXML.find('medioTransporte').text()}`).attr("data-element", "medio-transporte-ruta");
                        article.append(medioTransporte);

                        let agencia = $("<p>").text(`Agencia: ${rutaXML.find('agencia').text()}`).attr("data-element", "agencia-ruta");
                        article.append(agencia);

                        let coordenadas = $("<p>").text(`Coordenadas: ${rutaXML.find('coordenadasRuta > latitud').text()}, ${rutaXML.find('coordenadasRuta > longitud').text()}`).attr("data-element", "coordenadas-ruta");
                        article.append(coordenadas);

                        let altitud = $("<p>").text(`Altitud: ${rutaXML.find('coordenadasRuta > altitud').text()}`).attr("data-element", "altitud-ruta");
                        article.append(altitud);

                        let sugerencias = $("<p>").text(`Sugerencias: ${rutaXML.find('sugerencias').text()}`).attr("data-element", "sugerencias-ruta");
                        article.append(sugerencias);



                        let recomendacion = $("<p>").text(`Recomendación: ${rutaXML.find('recomendacion').text()}/10`).attr("data-element", "recomendacion-ruta");
                        article.append(recomendacion);

                        let referecias = $("<ul>").attr("data-element", "lista-referencias");

                        rutaXML.find("referencia").each((index, ref) => {
                            let lista = $("<li>").attr("data-element", "referencias-ruta");

                            let enlace = $("<a>").text(`Referencia ${index + 1}`).attr("href", ref.outerText);
                            lista.append(enlace);
                            referecias.append(lista);
                        });
                        article.append(referecias);



                        let seccionHitos = $("<section>").attr("data-element", "hitos");
                        let hitos = $("<h5>").text("Hitos");
                        seccionHitos.append(hitos);
                        rutaXML.find('hito').each((index, hito) => {
                            let articuloHitos = $("<article>").attr("data-element", "articuloHitos");
                            seccionHitos.append(articuloHitos);
                            const hitoXML = $(hito);
                            //${hitoXML.attr("nombreRuta")}`).attr("data-element", "nombre-ruta");
                            let nombreHito = $("<h6>").text(`${hitoXML.attr("nombreHito")}`);
                            articuloHitos.append(nombreHito);
                            let descripcionHito = $("<p>").text(hitoXML.find('descripcionHito').text());
                            articuloHitos.append(descripcionHito);

                            let coordenadasHito = $("<p>").text(`Coordenadas: ${hitoXML.find('coordenadasHito > latitud').text()}, ${hitoXML.find('coordenadasHito > longitud').text()}`);
                            articuloHitos.append(coordenadasHito);

                            let altitud = $("<p>").text(`Altitud: ${hitoXML.find('coordenadasHito > altitud').text()}`);
                            articuloHitos.append(altitud);

                            let distanciaHito = $("<p>").text(`Distancia de la salida: ${hitoXML.find('distancia').text()} metros`);
                            articuloHitos.append(distanciaHito);

                            let galeria = $("<section>").attr("data-element", "galeria");
                            let fotos = $("<h5>").text("Galería de fotos");
                            galeria.append(fotos);

                            hitoXML.find("foto").each((index, foto) => {
                                let img = $("<img>").attr("src", foto.outerText).attr("alt", `Foto de ${hitoXML.attr('nombreHito')}`);
                                galeria.append(img);
                            })
                            articuloHitos.append(galeria);
                        })
                        article.append(seccionHitos);

                        seccion.append(article);
                        $("main").append(seccion);
                    });
                }
            }
        }
    }
}