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
        let celdaClicada = null;
        const main = document.querySelector('main')
        const h3 = document.createElement('h3');
        h3.textContent = "Crucigrama - Nivel " + this.lvl + "";
        main.appendChild(h3);        //si selecciono una celda pero noe scribo nada, y selecciono otra, la primera a qué estado vuelve?
        for (let fila = 0; fila < this.row; fila++) {
            for (let col = 0; col < this.column; col++) {
                const valor = this.boardArry[fila][col];

                const p = document.createElement('p');
                p.dataset.row = fila;
                p.dataset.column = col;
                if (valor === 0) {
                    p.addEventListener('click', () => {
                        if (celdaClicada) {
                            celdaClicada.setAttribute('data-state', 'init');
                        }
                        celdaClicada = p;
                        celdaClicada.setAttribute('data-state', 'clicked')
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
        this.init_time = Date.now();
    }


    introduceElement(pulsado) {
        var celda = document.querySelectorAll('p[data-state="clicked"]');
        const r = celda[0].dataset.row;
        const c = celda[0].dataset.column;

        if (this.asserts(pulsado, r, c)) {
            celda[0].setAttribute('data-state', 'incorrent');
            return false;
        }

        this.boardArry[r][c] = pulsado;
        var expression_row = this.check_horizontal(r, c);
        var expression_col = this.check_vertical(r, c);

        if (expression_row && expression_col) {
            celda[0].textContent = pulsado;
            celda[0].setAttribute("data-state", "correct");

        } else {
            this.boardArry[r][c] = 0;
            celda[0].setAttribute("data-state", "incorrent");
            alert("Elemento introducido no correcto");
        }

        if (this.check_win_condition()) {
            this.end_time = Date.now();
            this.finish()
            return true;

        }
        return false;
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
        this.totalTime = this.calculate_date_difference();
        alert("Felicidades, tu tiempo a sido: " + this.totalTime)
    }

    calculate_date_difference() {
        let tiempo = Math.floor((this.end_time - this.init_time) / 1000);

        let horas = Math.floor(tiempo / (60 * 60));
        tiempo = tiempo - (horas * 60 * 60);

        let minutos = Math.floor(tiempo / 60);
        let segundos = Math.floor(tiempo % 60);

        let resultado = (horas >= 10 ? horas : "0" + horas) + ":" +
            (minutos >= 10 ? minutos : "0" + minutos) + ":" +
            (segundos >= 10 ? segundos : "0" + segundos);

        return resultado;
    }

    check_horizontal(r, c) {
        var expression_row = true;
        let first_number = 0;
        let second_number = 0;
        let expression = 0;
        let result = 0;

        c++;
        if (c < this.column) {
            if (this.boardArry[r][c] != -1) {
                do {
                    if (this.boardArry[r][c] === "=") {
                        first_number = this.boardArry[r][c - 3];
                        second_number = this.boardArry[r][c - 1];
                        expression = this.boardArry[r][c - 2];
                        result = this.boardArry[r][c + 1];
                        break;
                    }

                    c++;

                    if (c >= this.column)
                        break;

                } while (this.boardArry[r][c] != -1)
            }
        }
        if (first_number != 0 && second_number != 0 && expression != 0 && result != 0) {
            var expr = [first_number, expression, second_number];
            var resEval;
            try {
                resEval = eval(expr.join(''));
                if (resEval != result)
                    expression_row = false;
            } catch (error) {
                expression_row = false;
            }

        }

        return expression_row;
    }



    check_vertical(r, c) {
        var expression_col = true;
        let first_number = 0;
        let second_number = 0;
        let expression = 0;
        let result = 0;
        r++;
        if (r < this.row) {
            if (this.boardArry[r][c] != -1) {
                do {
                    if (this.boardArry[r][c] === "=") {
                        first_number = this.boardArry[r - 3][c];
                        second_number = this.boardArry[r - 1][c];
                        expression = this.boardArry[r - 2][c];
                        result = this.boardArry[r + 1][c];
                        break;
                    }

                    r++;

                    if (r >= this.row)
                        break;

                } while (this.boardArry[r][c] != -1)
            }
        }
        if (first_number != 0 && second_number != 0 && expression != 0 && result != 0) {
            var expr = [first_number, expression, second_number];
            var resEval;
            try {
                resEval = eval(expr.join(''));
                if (resEval != result)
                    expression_col = false;
            } catch (error) {
                expression_col = false;
            }
        }

        return expression_col;
    }
}