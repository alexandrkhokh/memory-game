import './styles/style.scss'
import createEl from "./createEl.js";
import header from "./components/Header.js";

const CARD_IMAGES = [ '1', '2', '3', '4', '5', '6', '7', '8' ];
const totalPairs = [...CARD_IMAGES, ...CARD_IMAGES];

const FLIP_DELAY = 1000;
const VICTORY_DELAY = 300;

const app = createEl({ id: 'app' }, [header]);

document.body.prepend(app);