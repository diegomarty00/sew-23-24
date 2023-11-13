"use strict";
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

	verDatosSecundarios(){
		 var stringDatos =  "<ul><li>Población: " + this.poblacion + "</li>";
             stringDatos += "<li>Forma de gobierno: " + this.gobierno + "</li>";
             stringDatos += "<li>Religión mayoritaria: " + this.religion + "</li><ul>";
		return stringDatos;
	}	
	
}

var lesoto = new Pais('Lesoto', 'Maseru', '330760', 'monarquía parlamentaria', '-29.31', '27.48', 'Cristianismo');