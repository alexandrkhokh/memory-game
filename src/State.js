const FLIP_DELAY = 1000;

class State {
    _moves;
    currentOpenCards;
    gameCompleted;

    constructor() {
        this._moves = 0;
        this.cards = new Map();
        this.currentOpenCards = new Set();
        this.matched = new Set();
        this.gameCompleted = false;
    }
    get matches() {
        return this.matched.size / 2;
    }

    get moves() {
        return this._moves;
    }

    increaseMoves = () => {
        this._moves += 1;
        document.dispatchEvent(new Event('increaseMoves'))
    }

    flipCard = (i) => {
        const index = Number(i);

        if(this.matched.has(index)) {
            return;
        }
        if(this.currentOpenCards.has(index)){
            this.currentOpenCards.delete(index);
            this.increaseMoves();
        }

        this.cards.get(Number(index)).classList.toggle('flipped')

        this.currentOpenCards.add(Number(index))

        if(this.currentOpenCards.size === 2) {
            const [first, second] = this.currentOpenCards.values()

            const firstCardEl = this.cards.get(first)
            const secondCardEl = this.cards.get(second)

            const isMatch = firstCardEl.dataset.name === secondCardEl.dataset.name

            if(isMatch) {
                this.matched.add(first)
                this.matched.add(second)

                if(this.matched.size === 16) {
                    console.log("Complete");
                }

            } else {
                setTimeout(() => {
                    firstCardEl.classList.toggle('flipped')
                    secondCardEl.classList.toggle('flipped')
                }, FLIP_DELAY)
            }
            this.currentOpenCards.clear();
            this.increaseMoves();
        }
    }
}

const state = new State();

export default state;

















