import StorageHelper from "./utilities/StorageHelper.js";

import createEl from "./utilities/createEl.js";
import createCard from "./components/Cards.js";
import createModal from "./components/Modal.js";

import shuffle from "./utilities/fisher-sort.js";

const FLIP_DELAY = 1000;
const VICTORY_DELAY = 300;
const CARD_IMAGES = ['8625514', '8625640', '8625876', '8625987', '8634933', '8636483', '8636575', '8642046'];
const totalPairs = [...CARD_IMAGES, ...CARD_IMAGES];

class State {
    _moves;
    currentOpenCards;
    gameCompleted;

    constructor() {
        this.field = createEl({id: 'game-field'})
        this._moves = 0;
        this.cards = new Map();
        this.currentOpenCards = new Set();
        this.matched = new Set();
        this.gameCompleted = false;
        this.isLocked = false;

        this.initNewGame();
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
                    const newGameButton = createEl({tag: 'button'}, ['Новая игра'])
                    newGameButton.addEventListener('click', this.initNewGame);
                    setTimeout(() => {
                        createModal(createEl({}, ['Поздравляем с победой!']), newGameButton)
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

    clickHandler = (event) => {
        const targetCard = event.target.closest('.card');
        const index = targetCard.dataset.id;

        this.flipCard(index);
    }

    initNewGame = () => {
        this._moves = 0;
        this.cards.clear();
        this.currentOpenCards.clear();
        this.matched.clear();
        this.gameCompleted = false;
        this.isLocked = false;

        const cardsWrapper = new DocumentFragment();

        const shuffledCards = shuffle(totalPairs);
        shuffledCards.map((card, index) => {
            const c = createCard(card, index);
            c.addEventListener('click', this.clickHandler)
            this.cards.set(index, c);
            cardsWrapper.append(c);
        });
        this.field.replaceChildren(cardsWrapper);
        document.dispatchEvent(new Event('increaseMoves'))
    }

    getField() {
        return this.field;
    }
}

const state = new State();

export default state;

















