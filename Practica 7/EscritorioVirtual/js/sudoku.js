class Sudoku {

    level1 = "3.4.69.5....27...49.2..4....2..85.198.9...2.551.39..6....8..5.32...46....4.75.9.6"
    level2 = "23.94.67.8..3259149..76.32.1.....7925.321.4864..68.5317..1....96598721433...9...7"
    level3 = "8.4.71.9.976.3....5.196....3.7495...692183...4.5726..92483591..169847...753612984"

    constructor(level) {

        this.boardString = this.level1.split('');
        if (level === 2)
            this.boardString = this.level2.split('');
        if (level === 3)
            this.boardString = this.level3.split('');

        this.row = 9;
        this.column = 9;
        this.boardArry = new Array(this.row).fill().map(() => new Array(this.column).fill(undefined));;
        this.start();
    }

    start() {
        var counter = 0;
        for (let r = 0; r < this.row; r++) {
            for (let c = 0; c < this.column; c++) {
                this.boardArry[r][c] = this.valueBoard(this.boardString[counter])
                counter++;
            }
        }
        this.init_time = Date.now();
    }

    valueBoard(character) {
        if (character == ".")
            return 0;
        return character;
    }

    createStructure() {
        let celdaClicada = null;

        const main = document.querySelector('main')

        for (let r = 0; r < this.row; r++) {
            for (let c = 0; c < this.column; c++) {
                const valor = this.boardArry[r][c];

                const p = document.createElement('p');

                p.dataset.row = r;
                p.dataset.column = c;
                if (valor === 0) {
                    p.addEventListener('click', () => {
                        if (celdaClicada) {
                            celdaClicada.setAttribute('data-state', 'init');
                        }
                        celdaClicada = p;
                        celdaClicada.setAttribute('data-state', 'clicked')
                    });
                } else {
                    const span = document.createElement('span');
                    span.textContent = valor;
                    p.appendChild(span);
                }
                main.appendChild(p);
            }
        }
    }

    paintSudoku() {
        this.createStructure();
    }

    introduceNumber(numPulsado) {
        const celda = document.querySelectorAll('p[data-state="clicked"]');
        const r = celda[0].dataset.row;
        const c = celda[0].dataset.column;

        if (this.asserts(numPulsado, r, c))
            return;

        celda[0].textContent = numPulsado;
        this.boardArry[r][c] = numPulsado;
        celda[0].onClick = null;
        celda[0].setAttribute('data-state', 'correct');


        let finish = true;

        // Recorre cada fila del tablero
        for (let i = 0; i < this.boardArry.length; i++) {
            let row = this.boardArry[i];

            // Recorre cada elemento de la fila
            for (let j = 0; j < row.length; j++) {
                let element = row[j];

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

    finish() {
        let tiempo;
        if (Math.floor(this.totalTime / 60) != 0) {
            tiempo = Math.floor(this.totalTime / 60) + " minutos y " + Math.floor(this.totalTime % 60) + " segundos";
        } else {
            tiempo = Math.floor(this.totalTime % 60) + " segundos";
        }
        alert('Felicidades, has tardado ' + tiempo);

    }

    asserts(numPulsado, r, c) {

        numPulsado = numPulsado.toString();

        if (this.boardArry[r].includes(numPulsado)) {
            alert('Coincidencia en la misma línea');
            return true;
        }

        const columnArray = this.boardArry.map((r) => r[c]);
        if (columnArray.includes(numPulsado)) {
            alert('Coincidencia en la misma columna');
            return true;
        }

        const bigRow = r - (r % 3);
        const bigColum = c - (c % 3);

        for (let row = bigRow; row < bigRow + 3; row++) {
            for (let col = bigColum; col < bigColum + 3; col++) {
                if (this.boardArry[row][col] === numPulsado) {
                    alert('Coincidencia en el mismo area');
                    return true;
                }
            }
        }
        return false
    }



}