import createEl from "../createEl.js";

let turns = 0;
let pairs = 0;

const newGameBtn = createEl({tag: 'button'}, ['Новая игра']);
newGameBtn.addEventListener('click', () => console.log('Start New Game'));

const highScoresBtn = createEl({tag: 'button'}, ['Таблица лидеров']);
highScoresBtn.addEventListener('click', () => console.log('Show High Scores'));

const header = createEl({tag: 'header'}, [
    createEl({}, ['Memory Game']),
    createEl({tag: 'nav'}, [
        createEl({tag: 'ul'}, [
            createEl({tag: 'li'}, [
                newGameBtn
            ]),
            createEl({tag: 'li'}, [
                highScoresBtn
            ])
        ])
    ]),
    createEl({class: 'd-flex gap-1'}, [
        createEl({}, [`${turns} ходов`]),
        createEl({}, [`Найдено ${pairs} из 8`])
    ])
])

export default header;