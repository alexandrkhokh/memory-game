import createEl from "../createEl.js";

class Card {
    constructor(text) {
        this.text = text;
    }

    create = () => createEl({className: 'card'}, `${this.text}`);
}

export default function createCard(text){
    const c = new Card(text);
    return c.create();
}