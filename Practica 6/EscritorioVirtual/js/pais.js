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

var lesoto = new Pais('Lesoto', 'Maseru', '330760');
lesoto.setCoordenadas('-29.31', '27.48');
lesoto.setGobierno('monarquía parlamentaria');
lesoto.setReligion('Cristianismo');

document.write("<p>Pais: ")
document.write(lesoto.nombre);
document.write("</p>")

document.write("<p>Capital: ")
document.write(lesoto.capital);
document.write("</p>")

document.write("<p>Población: ")
document.write(lesoto.poblacion);
document.write("</p>")

document.write("<section>");
document.write("<h2>Otros datos del pais</h2>");
document.write(lesoto.verDatosSecundarios());
document.write("</section>");