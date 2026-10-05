import StorageHelper from "./utilities/StorageHelper.js";
import createModal from "./components/Modal.js";
import createEl from "./utilities/createEl.js";

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
        this.isLocked = false;
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

        if(this.isLocked || this.matched.has(index)) {
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

                // Победа
                if(this.matched.size === 16) {

                    setTimeout(() => {
                        createModal(createEl({}, ['Поздравляем с победой!']))
                    }, 300);
                    const highScores = StorageHelper.get('high-scores');

                    const now = new Date();
                    const dd = String(now.getDate()).padStart(2, '0');
                    const mm = String(now.getMonth() + 1).padStart(2, '0');
                    const yyyy = now.getFullYear();

                    const newScore = {
                        moves: this._moves,
                        data: `${dd}.${mm}.${yyyy}`
                    }

                    if(!highScores) {
                        StorageHelper.set('high-scores', [newScore] )
                    } else {
                        highScores.push(newScore)
                        StorageHelper.set('high-scores', highScores)
                    }

                }

            } else {
                this.isLocked = true;
                setTimeout(() => {
                    firstCardEl.classList.toggle('flipped')
                    secondCardEl.classList.toggle('flipped')
                    this.isLocked = false;
                }, FLIP_DELAY)
            }
            this.currentOpenCards.clear();
            this.increaseMoves();
        }
    }

    initNewGame() {
        this.cards.

        this._moves = 0;
        this.cards.clear();
        this.currentOpenCards.clear();
        this.matched.clear();
        this.gameCompleted = false;
        this.isLocked = false;
    }
}

const state = new State();

export default state;

















