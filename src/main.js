import './styles/style.scss'
import createEl from "./createEl.js";
import header from "./components/Header.js";
import createCard from "./components/Cards.js";
import state from "./State.js";

const CARD_IMAGES = [ '1', '2', '3', '4', '5', '6', '7', '8' ];
const totalPairs = [...CARD_IMAGES, ...CARD_IMAGES];

const FLIP_DELAY = 1000;
const VICTORY_DELAY = 300;

const field = createEl({id: 'game-field'},
    CARD_IMAGES.map(i => {
        const c = createCard(i);
        c.addEventListener('click', state.increaseMoves)
        return c;
    })
    )

const app = createEl({ id: 'app' }, [
    header,
    field
]);

document.body.prepend(app);