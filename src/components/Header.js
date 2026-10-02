import createEl from "../createEl.js";
import state from "../State.js";

const stats = createEl({ className: 'stats'});

function updateHeader(){
    const turnEl = createEl({}, [`${state.moves} ходов`]);
    const matches = createEl({}, [`Найдено ${state.matches} из 8`]);
    const fragment = createEl({ tag: 'div'}, [ turnEl, matches ])
    stats.replaceChildren(fragment);
}


const newGameBtn = createEl({tag: 'button'}, ['Новая игра']);
newGameBtn.addEventListener('click', () => console.log('Start New Game'));

const highScoresBtn = createEl({tag: 'button'}, ['Таблица лидеров']);
highScoresBtn.addEventListener('click', () => console.log('Show High Scores'));

const header = createEl({tag: 'header'}, [
    createEl({}, ['Memory Game']),

    createEl({tag: 'nav'}, [
        createEl({tag: 'ul'}, [
            createEl({tag: 'li'}, [ newGameBtn ]),
            createEl({tag: 'li'}, [ highScoresBtn ])
        ])
    ]),

    createEl({class: 'd-flex gap-1'}, [ stats ])
])

updateHeader();

document.addEventListener('increaseMoves', () => {
    updateHeader()
})
export default header;
