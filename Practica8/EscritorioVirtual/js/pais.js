class Pais {

	constructor(nombre, capital, poblacion) {
		this.nombre = nombre;
		this.capital = capital;
		this.poblacion = poblacion;
	}

	setGobierno(gobierno) {
		this.gobierno = gobierno;
	}

	setReligion(religion) {
		this.religion = religion;
	}

	setCoordenadas(longitud, latitud) {
		this.longitud = longitud;
		this.latitud = latitud;
	}

	getNombre() {
		return this.nombre;
	}

	getCapital() {
		return this.capital;
	}

	getCoordenadas() {
		return this.latitud + ", " + this.longitud;
	}


	verDatosSecundarios() {
		var stringDatos = "<p>Población: " + this.poblacion + "</p>";
		stringDatos += "<p>Forma de gobierno: " + this.gobierno + "</p>";
		stringDatos += "<p>Religión mayoritaria: " + this.religion + "</p>";
		return stringDatos;
	}

	verTiempo(capital) {
		const apiKey = '13e780276233960d55c6d669b702711f';
		const url = `http://api.openweathermap.org/data/2.5/forecast?q=${this.capital}&units=metric&appid=${apiKey}`;

		$.ajax({
			url: url,
			type: 'GET',
			dataType: 'json',
			success: function (data) {
				var filteredList = data.list.filter(item => item.dt_txt.includes('12:00:00'));

				var section = $('<section>').attr('data-name', 'meteo');
				section.append($(`<h2>Tiempo en ${capital} </h2>`));
				filteredList.forEach(item => {
					var article = $('<article>');

					// Obtener los valores requeridos y asignar 0 si rain no está presente
					var dia = item.dt_txt.split(" ")[0];
					var tempMax = item.main.temp_max || 0;
					var tempMin = item.main.temp_min || 0;
					var humidity = item.main.humidity || 0;
					var rain = item.rain ? item.rain['3h'] : 0;

					// Obtener la URL base para los iconos y agregar el nombre del icono
					var iconUrlBase = 'http://openweathermap.org/img/wn/';
					var iconUrl = `${iconUrlBase}${item.weather[0].icon}.png`;

					// Agregar elementos a la tabla
					var text = $(`
							<h3><span>${dia}</span></h3>
							<p>Temp. Máxima: ${tempMax}°C</p>
							<p>Temp. Mínima: ${tempMin}°C</p>
							<p>Humedad: ${humidity}%</p>
							<p>Lluvia: ${rain} mm</p>
							<img src="${iconUrl}" alt="Icono del tiempo">
					`);

					article.append(text);
					section.append(article);
				});

				$('main').append(section);

				//console.log(filteredList);
			},
			error: function (error) {
				console.error(error);
			}
		});
	}
}

