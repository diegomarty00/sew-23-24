class Crucigrama {

    lvl1 = "4,*,.,=,12,#,#,#,5,#,#,*,#,/,#,#,#,*,4,-" +
        ",.,=,.,#,15,#,.,*,#,=,#,=,#,/,#,=,.,#,3,#,4,*,.,=,20,=,#,#,#,#,#,=,#,#,8,#,9,-,.,=,3,#,.,#,#,-" +
        ",#,+,#,#,#,*,6,/,.,=,.,#,#,#,.,#,#,=,#,=,#,#,#,=,#,#,6,#,8,*,.,=,16";
    lvl2 = "12,*,.,=,36,#,#,#,15,#,#,*,#,/,#,#,#,*,.,-" +
        ",.,=,.,#,55,#,.,*,#,=,#,=,#,/,#,=,.,#,15,#,9,*,.,=,45,=,#,#,#,#,#,=,#,#,72,#,20,-,.,=,11,#,.,#,#,-" +
        ",#,+,#,#,#,*,56,/,.,=,.,#,#,#,.,#,#,=,#,=,#,#,#,=,#,#,12,#,16,*,.,=,32";
    lvl3 = "4,.,.,=,36,#,#,#,25,#,#,*,#,.,#,#,#,.,.,-" +
        ",.,=,.,#,15,#,.,*,#,=,#,=,#,.,#,=,.,#,18,#,6,*,.,=,30,=,#,#,#,#,#,=,#,#,56,#,9,-" +
        ",.,=,3,#,.,#,#,*,#,+,#,#,#,*,20,.,.,=,18,#,#,#,.,#,#,=,#,=,#,#,#,=,#,#,18,#,24,.,.,=,72"

    row = 11;
    column = 9;
    boardArry = [];


    constructor(lvl) {
        this.boardArry = Array.from({ length: this.row }, () => Array(this.column));//inicializa al tamaño correspondinte
        this.lvl = lvl;
        this.start();
    }

    start(lvl) {
        let contador = 0;
        let elementos = this.lvl1.split(',');
        if (this.lvl == 2)
            elementos = this.lvl2.split(',');
        if (this.lvl == 3)
            elementos = this.lvl3.split(',');

        for (let fila = 0; fila < this.row; fila++) {
            for (let col = 0; col < this.column; col++) {
                const caracter = elementos[contador];

                // Comprobar y asignar valores según las reglas
                switch (caracter) {
                    case '#':
                        this.boardArry[fila][col] = -1;
                        break;
                    case '.':
                        this.boardArry[fila][col] = 0;
                        break;
                    default:
                        const valor = parseInt(caracter);
                        this.boardArry[fila][col] = isNaN(valor) ? caracter : valor;
                        break;
                }
                contador++;
            }
        }
    }

    paintMathword() {

        const main = document.querySelector('main')
        const h3 = document.createElement('h3');
        h3.textContent = "Crucigrama - Nivel " + this.lvl + "";
        main.appendChild(h3);        //si selecciono una celda pero noe scribo nada, y selecciono otra, la primera a qué estado vuelve?
        for (let fila = 0; fila < this.row; fila++) {
            for (let col = 0; col < this.column; col++) {
                const valor = this.boardArry[fila][col];

                const p = document.createElement('p');
                //le guardo la fila y columna para agilizra las futuras comprobaciones
                p.dataset.row = fila;
                p.dataset.column = col;
                if (valor === 0) { //no tendrá contenido --> se puede escribrir
                    p.addEventListener('click', () => {
                        p.setAttribute('data-state', 'clicked')
                    });
                } else {

                    if (valor === -1) {
                        p.setAttribute('data-state', 'empty')
                    } else {
                        p.setAttribute('data-state', 'blocked');
                        p.textContent = valor;
                    }

                }
                main.appendChild(p);
            }
        }
        this.init_time = new Date();
    }


    introduceElement(pulsado) {
        const celda = document.querySelectorAll('p[data-state="clicked"]');
        const r = celda[0].dataset.row;
        const c = celda[0].dataset.column;

        if (this.asserts(pulsado, r, c)) {
            celda[0].setAttribute('data-state', 'incorrent');
            return false;
        }


        //Buscamos el igual a la derecha
            //Asignamos first_number, expression, second_number y result


        //Buscamos el igual a la izquierda


        celda[0].textContent = pulsado;
        this.boardArry[r][c] = pulsado;
        celda[0].onClick = null;
        celda[0].setAttribute('data-state', 'correct');


        let finish = false;

        // Recorre cada fila del tablero
        for (let i = 0; i < this.boardArry.length; i++) {
            let r = this.boardArry[i];

            // Recorre cada elemento de la fila
            for (let j = 0; j < this.row.length; j++) {
                let element = r[j];

                // Si el elemento es igual a 0
                if (element === 0) {
                    finish = false;
                    break;
                }
            }

            if (!finish) {
                break;
            }
        }

        this.totalTime = (Date.now() - this.init_time) / 1000;
        return finish;

    }

    asserts(pulsado, r, c) {
        if (!isNaN(pulsado) && pulsado > 0 && pulsado <= 9) {
            try {
                if (this.boardArry[r][c + 1] > 0 &&
                    this.boardArry[r][c + 1] <= 99)
                    return true;
            } catch (error) {
            }
            try {
                if (this.boardArry[r][c - 1] > 0 &&
                    this.boardArry[r][c - 1] <= 99)
                    return true;
            } catch (error) {
            }

            try {
                if (this.boardArry[r + 1][c] > 0 &&
                    this.boardArry[r + 1][c] <= 99)
                    return true;
            } catch (error) {
            }
            try {
                if (this.boardArry[r - 1][c] > 0 &&
                    this.boardArry[r - 1][c] <= 99)
                    return true;
            } catch (error) {
            }
            return false;
        }
        if (['+', '-', '*', '/'].includes(pulsado)) {
            if (r != 0) {
                try {
                    if (this.boardArry[r - 1][c] > 0 &&
                        this.boardArry[r - 1][c] <= 99)
                        return false;
                } catch (error) {
                }
            }
            if (c != 0) {
                try {
                    if (this.boardArry[r][c - 1] > 0 &&
                        this.boardArry[r][c - 1] <= 99)
                        return false;
                } catch (error) {
                }
            }
            if (r != (this.row - 1)) {
                try {
                    if (this.boardArry[r + 1][c] > 0 &&
                        this.boardArry[r + 1][c] <= 99)
                        return false;
                } catch (error) {
                }
            }
            if (c != (this.column - 1)) {
                try {
                    if (this.boardArry[r][c + 1] > 0 &&
                        this.boardArry[r][c + 1] <= 99)
                        return false;
                } catch (error) {
                }
            }
            return true;
        }
        return true;
    }

    check_win_condition() {
        for (let r = 0; r < this.row; r++) {
            for (let c = 0; c < this.column; c++) {
                if (this.boardArry[r][c] == 0)
                    return false;
            }
        }
        return true;
    }

    finish() {
        let tiempo;
        if (Math.floor(this.totalTime / 60) != 0) {
            tiempo = Math.floor(this.totalTime / 60) + " minutos y " + Math.floor(this.totalTime % 60) + " segundos";
        } else {
            tiempo = Math.floor(this.totalTime % 60) + " segundos";
        }
        alert('Felicidades, has tardado ' + tiempo);

    }
}