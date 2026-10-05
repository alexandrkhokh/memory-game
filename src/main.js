import './styles/style.scss'
import createEl from "./utilities/createEl.js";
import shuffle from "./utilities/fisher-sort.js";
import header from "./components/Header.js";
import createCard from "./components/Cards.js";
import state from "./State.js";
import StorageHelper from "./utilities/StorageHelper.js";

const CARD_IMAGES = ['8625514', '8625640', '8625876', '8625987', '8634933', '8636483', '8636575', '8642046'];
const totalPairs = [...CARD_IMAGES, ...CARD_IMAGES];

const VICTORY_DELAY = 300;

const shuffledCards = shuffle(totalPairs);

const clickHandler = (event) => {
    const targetCard = event.target.closest('.card');
    const index = targetCard.dataset.id;

    state.flipCard(index);
}

const field = createEl({id: 'game-field'},
    shuffledCards.map((card, index) => {
        const c = createCard(card, index);
        c.addEventListener('click', clickHandler)
        state.cards.set(index, c);
        return c;
    })
    );

const app = createEl({ id: 'app' }, [
    header,
    field
]);

document.body.prepend(app);