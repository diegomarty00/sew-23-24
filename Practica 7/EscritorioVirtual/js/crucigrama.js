"use strict";
class Crucigrama {

	const column = 9;
	const row = 11;

	let boardStringEasy = "4,*,.,=,12,#,#,#,5,#,#,*,#,/,#,#,#,*,4,-
						,.,=,.,#,15,#,.,*,#,=,#,=,#,/,#,=,.,#,3,#,4,*,.,=,20,=,#,#,#,#,#,=,#,#,8,#,9,-,.,=,3,#,.,#,#,-
						,#,+,#,#,#,*,6,/,.,=,.,#,#,#,.,#,#,=,#,=,#,#,#,=,#,#,6,#,8,*,.,=,16”;
						
	let boardStringMidium = “12,*,.,=,36,#,#,#,15,#,#,*,#,/,#,#,#,*,.,-
						,.,=,.,#,55,#,.,*,#,=,#,=,#,/,#,=,.,#,15,#,9,*,.,=,45,=,#,#,#,#,#,=,#,#,72,#,20,-,.,=,11,#,.,#,#,-
						,#,+,#,#,#,*,56,/,.,=,.,#,#,#,.,#,#,=,#,=,#,#,#,=,#,#,12,#,16,*,.,=,32";

	let boardStringHard = "4,.,.,=,36,#,#,#,25,#,#,*,#,.,#,#,#,.,.,-
						,.,=,.,#,15,#,.,*,#,=,#,=,#,.,#,=,.,#,18,#,6,*,.,=,30,=,#,#,#,#,#,=,#,#,56,#,9,-
						,.,=,3,#,.,#,#,*,#,+,#,#,#,*,20,.,.,=,18,#,#,#,.,#,#,=,#,=,#,#,#,=,#,#,18,#,24,.,.,=,72";
						
	let boardArray = [][];
	let init_time;
	let end_time;
	

	constructor(difficulty) {
		start(difficulty);
  }
}
	}
	
	start(difficulty){
		var drawBoard = boardStringEasy.split(",");
		if (difficulty == 2)
			drawBoard = boardStringMidium.split(",");
		if (difficulty == 3)
			drawBoard = boardStringHard.split(",");
		
		var counter = 0;
		for (let i = 0; i < row; i++) {
			for (let j = 0; j < column; j++) {
				boardArray[i][j] = ValueBoard(drawBoard[counter]);
				counter++;
			}
		}
		
		init_time = Date.now();
	}
	
	ValueBoard(){
		if (character == "#")
			return -1;
		if (character == ".")
			return 0;
		return character;
	}

	paintMathword(){
		for (let i = 0; i < row; i++) {
			for (let j = 0; j < column; j++) {
				let $parrafos = $("<p></p>").appendTo("body");
			}
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