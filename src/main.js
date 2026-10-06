import './styles/style.scss'
import createEl from "./utilities/createEl.js";
import header from "./components/Header.js";
import state from "./State.js";

const app = createEl({ id: 'app' }, [
    header,
    state.getField()
]);

document.body.prepend(app);