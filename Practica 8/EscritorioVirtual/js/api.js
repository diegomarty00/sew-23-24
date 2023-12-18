class Game {
    constructor(canvasId) {
        this.canvas = document.getElementById(canvasId);
        this.context = this.canvas.getContext('2d');
        this.letters = 'WASD';
        this.currentLetter = '';
        this.correctPresses = 0;
        this.incorrectPresses = 0;
        this.precision = 100.0;
        this.timeLeft = 15;

        this.fin = new Audio('multimedia/audios/fin.mp3');
    }

    init() {
        this.generateLetter();
        this.draw();
        this.start = false;
        window.addEventListener('keydown', (event) => this.checkLetter(event.key.toUpperCase()));
    }

    generateLetter() {
        const randomIndex = Math.floor(Math.random() * this.letters.length);
        this.currentLetter = this.letters[randomIndex];
    }

    draw() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.context.font = '30px serif';
        this.context.fillText(this.currentLetter, this.canvas.width / 2, this.canvas.height / 2);
        this.context.fillText(`Tiempo: ${this.timeLeft}`, 10, 50);
        this.context.fillText(`Aciertos: ${this.correctPresses}`, 10, 100);
        this.context.fillText(`Fallos: ${this.incorrectPresses}`, 10, 150);
        this.context.fillText(`Precisión: ${this.precision} %`, 10, 200);
    }

    checkLetter(key) {
        if (this.start == false){
            this.startTimer();
            this.start = true;
        }
        if (this.timeLeft > 0) {
            if (key === this.currentLetter) {
                this.playAcierto();
                this.correctPresses++;
                if (this.precision != 100)
                    this.precision = (this.correctPresses * 100 / (this.incorrectPresses + this.correctPresses)).toFixed(2)
                this.generateLetter();
            } else {
                this.playError();
                this.incorrectPresses++;
                this.precision = (this.correctPresses * 100 / (this.incorrectPresses + this.correctPresses)).toFixed(2)
            }
            this.draw();
        }
    }

    startTimer() {
        const timer = setInterval(() => {
            this.timeLeft--;
            this.draw();
            if (this.timeLeft <= 0) {
                clearInterval(timer);
                this.endGame();
            }
        }, 1000);
    }

    playAcierto() {
        let audio = new Audio('multimedia/audios/acierto.mp3');
        audio.play();
    }

    playError() {
        let audio = new Audio('multimedia/audios/error.mp3');
        audio.play();
    }

    endGame() {
        this.fin.play();
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.context.fillText(`¡FIN DE LA PARTIDA!`, 0, this.canvas.height / 2);
        this.context.fillText(`   Has tenido ${this.correctPresses} aciertos`, 0, this.canvas.height / 2 + 40);
        this.context.fillText(`    Presición del ${this.precision}%`, 0, this.canvas.height / 2 + 80);
    }

}

