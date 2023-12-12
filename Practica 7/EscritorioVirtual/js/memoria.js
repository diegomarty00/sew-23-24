class Memoria {
    constructor() {
        this.elements = [
            { element: "HTML5_1", source: "https://upload.wikimedia.org/wikipedia/commons/3/38/HTML5_Badge.svg" },
            { element: "HTML5_2", source: "https://upload.wikimedia.org/wikipedia/commons/3/38/HTML5_Badge.svg" },
            { element: "CSS3_1", source: "https://upload.wikimedia.org/wikipedia/commons/6/62/CSS3_logo.svg" },
            { element: "CSS3_2", source: "https://upload.wikimedia.org/wikipedia/commons/6/62/CSS3_logo.svg" },
            { element: "JS_1", source: "https://upload.wikimedia.org/wikipedia/commons/b/ba/Javascript_badge.svg" },
            { element: "JS_2", source: "https://upload.wikimedia.org/wikipedia/commons/b/ba/Javascript_badge.svg" },
            { element: "PHP_1", source: "https://upload.wikimedia.org/wikipedia/commons/2/27/PHP-logo.svg" },
            { element: "PHP_2", source: "https://upload.wikimedia.org/wikipedia/commons/2/27/PHP-logo.svg" },
            { element: "SVG_1", source: "https://upload.wikimedia.org/wikipedia/commons/4/4f/SVG_Logo.svg" },
            { element: "SVG_2", source: "https://upload.wikimedia.org/wikipedia/commons/4/4f/SVG_Logo.svg" },
            { element: "W3C_1", source: "https://upload.wikimedia.org/wikipedia/commons/5/5e/W3C_icon.svg" },
            { element: "W3C_2", source: "https://upload.wikimedia.org/wikipedia/commons/5/5e/W3C_icon.svg" },
        ];

        this.hasFlippedCard = false;
        this.lockBoard = false;
        this.firstCard = null;
        this.secondCard = null;

        this.shuffleElements()
        this.createElements();
        this.addEventListeners();


    }

    //Algoritmo Durstenfeld
    shuffleElements() {
        for (let i = this.elements.length - 1; i > 0; i--) {
            var j = Math.floor(Math.random() * (i + 1));
            [this.elements[i], this.elements[j]] = [this.elements[j], this.elements[i]];
        }
    }
    unflipCards() {
        this.lockBoard = true; 

        setTimeout(() => {
            this.firstCard.dataset.state = 'init';
            this.secondCard.dataset.state = 'init';

            this.resetBoard();
        }, 1000); // 
    }

    resetBoard() {
        this.firstCard = null;
        this.secondCard = null;
        this.hasFlippedCard = false;
        this.lockBoard = false;
    }

    checkForMatch() {
        if (this.firstCard.dataset.element.split('_')[0] === this.secondCard.dataset.element.split('_')[0]) {
            if (this.firstCard.dataset.element.split('_')[1] != this.secondCard.dataset.element.split('_')[1])
                this.disableCards();
        } else {
            this.unflipCards();
        }
    }

    disableCards() {
        this.firstCard.dataset.state = 'revealed';
        this.secondCard.dataset.state = 'revealed';
        this.resetBoard();
    }

    createElements() {
        let tablero = document.querySelector('main')
        var h3 = document.createElement('h3');
        h3.textContent = 'Juego de Memoria'
        tablero.appendChild(h3);
        for (const carta in this.elements) {
            const elementData = this.elements[carta];

            const card = document.createElement('article');
            card.setAttribute('data-element', elementData.element);

            const h4 = document.createElement('h4');
            h4.textContent = 'Tarjeta de memoria';
            card.appendChild(h4);

            const img = document.createElement('img');
            img.src = elementData.source;
            img.alt = elementData.element;
            card.appendChild(img);
            tablero.appendChild(card);
        }
    }

    addEventListeners() {
        const cards = document.querySelectorAll('article');
        cards.forEach(card => {
            card.addEventListener('click', this.flipCard.bind(card, this));
        });
    }

    flipCard(game) {
        if (this.dataset.state == 'revealed') return;
        if (game.lockBoard) return;
        if (game.firstCard != null)
            if (this.dataset.element == game.firstCard.element) return;

        this.dataset.state = 'flip';

        if (game.hasFlippedCard) {
            game.secondCard = this;
            game.checkForMatch();
        } else {
            game.hasFlippedCard = true;
            game.firstCard = this;
        }

    }

}
