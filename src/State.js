class State {
    _moves;
    currentOpenCards;
    gameCompleted;

    constructor() {
        this._moves = 0;
        this.currentOpenCards = [];
        this.matched = [];
        this.gameCompleted = false;
    }
    get matches() {
        return this.matched.length / 2;
    }

    get moves() {
        return this._moves;
    }

    increaseMoves = () => {
        this._moves += 1;
        document.dispatchEvent(new Event('increaseMoves'))
    }

    flipCard = (index) => {

    }
}

const state = new State();

export default state;