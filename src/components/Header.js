import createEl from "../utilities/createEl.js";
import createModal from '../components/Modal.js';
import state from "../State.js";
import StorageHelper from "../utilities/StorageHelper.js";

const stats = createEl({ className: 'stats'});

function updateHeader(){
    const turnEl = createEl({}, [`${state.moves} ходов`]);
    const matches = createEl({}, [`Найдено ${state.matches} из 8`]);
    const fragment = createEl({ tag: 'div'}, [ turnEl, matches ])
    stats.replaceChildren(fragment);
}

const newGameBtn = createEl({tag: 'button'}, ['Новая игра']);
newGameBtn.addEventListener('click', () => {
    state.initNewGame();
});

const highScoresBtn = createEl({tag: 'button'}, ['Таблица лидеров']);
highScoresBtn.addEventListener('click', () => {

    const highScoresData = StorageHelper.get('high-scores') ?? [];
    let highScores;

    if(highScoresData.length > 0){
        const rows = [...highScoresData]
            .sort((a, b) => a.moves - b.moves)
            .slice(0,10)
            .map((result, index) => createEl({tag: 'tr'}, [
                createEl({tag: 'td'}, [String(index + 1)]),
                createEl({tag: 'td'}, [String(result.moves)]),
                createEl({tag: 'td'}, [result.data])
            ]));

        highScores = createEl({tag: 'table'}, [
            createEl({tag: 'thead'}, [
                createEl({tag: 'tr'}, [
                    createEl({tag: 'th'}, ['Место']),
                    createEl({tag: 'th'}, ['Число ходов']),
                    createEl({tag: 'th'}, ['Дата'])
                ])
            ]),
            createEl({tag: 'tbody'}, rows)
        ]);
    } else {
        highScores = 'Пока нет результатов';
    }

    const modalContent = createEl({tag: 'div'}, [
        createEl({tag: 'h1'}, ['Таблица лидеров']),
        createEl({tag: 'div'}, [highScores])
    ])

    createModal( modalContent );
});

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
