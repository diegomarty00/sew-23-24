class Fondo {
    constructor(pais, capital, latitud, longitud) {
        this.pais = pais;
        this.capital = capital;
        this.latitud = latitud;
        this.longitud = longitud;

    }

    buscaFoto() {
        // Configura la URL de la API de Flickr
        const apiKey = 'a09054d9591e63f243358ca426c788d1';
        const flickrAPI = "http://api.flickr.com/services/feeds/photos_public.gne?jsoncallback=?";

        const conf = {
            method: 'flickr.photos.search',
            api_key: apiKey,
            tags: 'nature',
            format: 'json',
            lat: this.latitud,
            lon: this.longitud,
            radius: 6,
            text: 'Harare',
            per_page: 1,
            geo_context: 2, //outdoors
            extras: 'landscape'

        };

        $.getJSON(flickrAPI, conf)
            .done(function (data) {
                //seleccionar la foto
                var fotoLink = data.items[0].media.m;
                var betterQuality = fotoLink.replace('_m', '_b');
                var url = `url('${betterQuality}')`
                console.log(url)

                $('body').css('background-image', url)
                    .css('background-size', 'cover');
                console.log('se cambió el fondo')
            })
            .fail(function (error) {
                console.error('Error en la solicitud AJAX:', error);
            });

    }




    //API PUBLICA
    ponFondo() {
        const flickrApiUrl = 'https://api.flickr.com/services/rest/';
        const flickrAPI = "http://api.flickr.com/services/feeds/photos_public.gne?jsoncallback=?";


        $.getJSON(flickrAPI,
            {
                tags: "nature",
                format: "json",
                lat: this.latitud,
                lon: -this.longitud,
                radius: 6,
                text: 'Harare',
                sort: 'relevance',
                per_page: 1 // Obtener solo una imagen
            })
            .done(function (data) {
                //seleccionar la foto
                var fotoLink = data.items[0].media.m;
                var betterQuality = fotoLink.replace('_m', '_b');
                var url = `url('${betterQuality}')`
                console.log(url)

                //establecer la imagen para que ocupe toda la pantalla
                $('body').css('background-image', url)
                    .css('background-size', 'cover')
                    .css('background-repeat', 'no-repeat');
                console.log('se cambió el fondo')
            })
            .fail(function (error) {
                console.error('Error en la solicitud AJAX:', error);
            });

    }
}