class Pais {

	constructor(nombre, capital, poblacion) {
		this.nombre = nombre;
		this.capital = capital;
		this.poblacion = poblacion;
	}

	setGobierno(gobierno){
		this.gobierno = gobierno;
	}
	
	setReligion(religion){
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
	
	getCoordenadas(){
		return this.latitud + ", " + this.longitud;
	}


	verDatosSecundarios(){
		 var stringDatos =  "<ul><li>Población: " + this.poblacion + "</li>";
             stringDatos += "<li>Forma de gobierno: " + this.gobierno + "</li>";
             stringDatos += "<li>Religión mayoritaria: " + this.religion + "</li><ul>";
		return stringDatos;
	}	

	verTiempo() {
        const apiKey = '13e780276233960d55c6d669b702711f';
        const url = `http://api.openweathermap.org/data/2.5/forecast?q=${this.capital}&units=metric&appid=${apiKey}`;

		$.ajax({
			url: url,
			type: 'GET',
			dataType: 'json',
			success: function(data) {
				var filteredList = data.list.filter(item => item.dt_txt.includes('12:00:00'));

				var table = $('<table>');
				var article = $('<article>').attr('data-name', 'meteo').append(table);

				var row = $(`
						<tr>
							<th scope="col" id="dia">Día</th>
							<th scope="col" id="tempMax">Temp. Máxima</th>
							<th scope="col" id="tempMin">Temp. Máxima</th>
							<th scope="col" id="humidity">Humedad</th>
							<th scope="col" id="rain">Lluvia</th>
							<th scope="col" id="iconMeto">Previsión</th>	
						</tr>
					`);

					table.append(row);

				filteredList.forEach(item => {
					// Crear un bloque section para cada día
					var daySection = $('<section>');

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
					var row = $(`
						<tr>
						
							<td>${dia} </td>
							<td>${tempMax}°C</td>
							<td>${tempMax}°C</td>
							<td>${humidity}%</td>
							<td>${rain} mm</td>
							<td><img src="${iconUrl}" alt="Icono del tiempo"></td>
						</tr>
					`);

					table.append(row);
				});

				$('body').append(article);
				//console.log(filteredList);
			},
			error: function(error) {
				console.error(error);
			}
		});
	}

	
}

