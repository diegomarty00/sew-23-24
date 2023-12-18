class Agenda {
    constructor() {
        this.apiURL = 'https://ergast.com/api/f1/current'
        this.last_api_call = null;
        this.last_api_result = null;
        this.intervalo = 10;
    }

    verCarreras() {
        const now = new Date();
        const self = this;
        if (this.last_api_call !== null && (now - this.last_api_call) / (1000 * 60) < this.intervalo) {
            return this.last_api_result;
        }

        $.ajax({
            url: this.apiURL,
            method: 'GET',
            dataType: 'xml',
            success: function (data) {
                self.last_api_call = now;
                self.last_api_result = data;
                printData(data);
            },
            error: function (error) {
                console.error('Error en la solicitud AJAX:', error);
            }
        });

        function printData(data) {
            const section = $('<section>');


            $(data).find('Race').each((index, race) => {
                var raceName = $(race).find('RaceName').text();
                var circuitName = $(race).find('CircuitName').text();

                var latitud = $(race).find('Location').attr('lat');
                var longitud = $(race).find('Location').attr('long');

                var date = $(race).find('Date').first().text();
                var time = $(race).find('Time').first().text();
                var formatTime = time.substring(0, 5);;
                var location = $(race).find('Location').text();


                const article = $('<article>');
                article.html('<h3>' + raceName + "</h3><p>" + circuitName + "</p><p>(" + latitud + ', ' + longitud
                    + ")</p><p>" + date + ", " + formatTime + "</p>");
                section.append(article);
            });
            $('main').append(section);
        }
    }

}