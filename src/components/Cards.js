import createEl from "../createEl.js";

class Card {
    constructor(name, index) {
        this.name = name;
        this.index = index;
    }

    create = () => createEl({
        className: 'card',
        'data-id': this.index,
        'data-name': this.name
    }, [
        createEl({
            className: 'card__inner'
        }, [
            createEl({
                tag: 'img',
                className: 'card__front',
                src: `/img/${this.name}.png`
            }),
            createEl({
                tag: 'img',
                className: 'card__back',
                src: `/img/cover.png`
            })
        ])
    ]);
}

export default function createCard(name, index){
    const c = new Card(name, index);
    return c.create();
}