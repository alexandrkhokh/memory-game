import './styles/style.scss'
import createEl from "./createEl.js";
import header from "./components/Header.js";
import createCard from "./components/Cards.js";
import state from "./State.js";
import shuffle from "./utilities/fisher-sort.js";

const CARD_IMAGES = ['8625514', '8625640', '8625876', '8625987', '8634933', '8636483', '8636575', '8642046'];
const totalPairs = [...CARD_IMAGES, ...CARD_IMAGES];

const FLIP_DELAY = 1000;
const VICTORY_DELAY = 300;

const shuffledCards = shuffle(totalPairs);

const clickHandler = (event) => {
    state.increaseMoves();
    state.pushCurrent(index);
    event.target.closest('.card').classList.toggle('flipped')
}

const field = createEl({id: 'game-field'},
    shuffledCards.map((card, index) => {
        const c = createCard(card, index);
        c.addEventListener('click', clickHandler)
        return c;
    })
    );

const app = createEl({ id: 'app' }, [
    header,
    field
]);

document.body.prepend(app);