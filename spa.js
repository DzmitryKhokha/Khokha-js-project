'use strict'
window.onhashchange = SwitchToStateFromURLHash;

function SwitchToStateFromURLHash() {
    let hash = window.location.hash;
    let State = decodeURIComponent(hash.substr(1));

    if (State !== "")
        State = JSON.parse(State);
    else
        State = {pageName: 'Main'};
    document.getElementById('wrapper').innerHTML = '';

    switch (State.pageName) {
        case 'Main':
            initMainPage();
            break;
        case 'Rules':
            initRulesPage();
            break;
        case 'Records':
            initRecordsPage();
            break;
        case 'About Game':
            initAboutGamePage();
            break;
        case 'New Game':
            initGame();
            break;
    }

}
function SwitchToState(State) {
    location.hash = encodeURIComponent(JSON.stringify(State));
}
function SwitchToMainPage() {
    SwitchToState({ pageName: 'Main'} );
    document.location.reload();
}
function SwitchToRulesPage() {
    SwitchToState({ pageName: 'Rules'} );
}
function SwitchToRecordsPage() {
    SwitchToState({ pageName: 'Records'} );
}
function SwitchToAboutPage() {
    SwitchToState({ pageName: 'About Game'} );
}
function SwitchToNewGamePage() {
    SwitchToState({pageName: 'New Game'} );
    document.location.reload();
}
SwitchToStateFromURLHash();

//main-page
function initMainPage() {
    let wrapper = document.getElementById('wrapper');
    console.log(wrapper);
    wrapper.className = 'wrapper';
    wrapper.appendChild(initMainMenu());
    wrapper.appendChild(initLogoContainer());
    return wrapper;
}

function initMainMenu() {
    let mainMenu = document.createElement('div');
    mainMenu.className = 'main-menu';
    mainMenu.appendChild(initMenuButtons('New Game', 'btn', SwitchToNewGamePage));
    mainMenu.appendChild(initMenuButtons('Rules', 'btn', SwitchToRulesPage));
    mainMenu.appendChild(initMenuButtons('Records', 'btn', SwitchToRecordsPage));
    mainMenu.appendChild(initMenuButtons('About Game', 'btn', SwitchToAboutPage));
    return mainMenu;
}

function initMenuButtons(text, className, hashChange) {
    let button = document.createElement('button');
    button.textContent = text;
    button.className = className;
    button.onclick = hashChange;
    return button;
}

function initLogoContainer() {
    let container = document.createElement('div');
    container.className = 'container';
    container.appendChild(initLogo());
    return container;
}

function initLogo() {
    let logo = document.createElement('div');
    logo.className = 'logo';
    logo.appendChild(initLogoImg());
    return logo;
}

function initLogoImg() {
    let figure = document.createElement('figure');
    let img = document.createElement('img');
    img.className = 'frog';
    img.src = '../img/main-page-background-4.png';
    img.alt = 'frogger';
    figure.appendChild(img);
    return figure;
}

//rules-page
function initRulesPage() {
    let wrapper = document.getElementById('wrapper');
    wrapper.className = 'wrapper';
    wrapper.appendChild(initRulesLogo());
    wrapper.appendChild(initRules());
    wrapper.appendChild(initButton(SwitchToMainPage));
    return wrapper;
}

function initRulesLogo() {
    let rulesLogo = document.createElement('div');
    rulesLogo.className = 'rules-logo';
    let img = document.createElement('img');
    img.src = '../img/little-frog.png';
    img.alt = 'little-frog';
    rulesLogo.appendChild(img);
    return rulesLogo;
}

function initRules() {
    let rules = document.createElement('div');
    rules.className = 'rules';
    let rulesHeading = document.createElement('div');
    rulesHeading.className = 'rules-heading';
    let h1 = document.createElement('h1');
    h1.textContent = 'Rules';
    rulesHeading.appendChild(h1);
    let rulesInfo = document.createElement('div');
    rulesInfo.className = 'rules-info';
    let p = document.createElement('p');
    p.textContent = 'Лягушка должна добраться до другого берега реки. Пользователь управляет лягушкой с помощью' +
        'стрелок на клавиатуре (или с помощью touch - для устройств с поддержкой touch). На старте игры лягушка' +
        'находится в безопасной зоне по которой она может передвигаться влево и вправо по полю. На пути лягушки' +
        ' будет дорога, по которой едут машины с разной скоростью. Дальше, после дороги река. Река постоянно' +
        'движется(течёт). По реке плывут брёвна и черепахи на которые лягушка может запрыгнуть, чтобы перебраться на' +
        'другой берег. Прыгнул мимо - проиграл. Не успел - проиграл, сбила машина - проиграл. При столкновении или' +
        'прыжке мимо бревна(черепахи) будут подсчитываться неудачные попытки. При каждой неудачной попытке игрок' +
        'начинает заново. Добрался до другого берега реки - выиграл(получил очко, лягушка появляется в начальной' +
        'позиции и скорость игры увеличивается). Среди игроков будет рейтинг.';
    rulesInfo.appendChild(p);
    rules.appendChild(rulesHeading);
    rules.appendChild(rulesInfo);
    return rules;
}

function initButton(hashchange) {
    let buttonDiv = document.createElement('div');
    buttonDiv.className = 'buttons';
    let button = document.createElement('button');
    button.className = 'btn';
    button.textContent = 'Main Page';
    button.onclick = hashchange;
    buttonDiv.appendChild(button);
    return buttonDiv;
}

//records-page
function initRecordsPage() {
    let wrapper = document.getElementById('wrapper');
    wrapper.className = 'wrapper';
    wrapper.appendChild(initRulesLogo());
    wrapper.appendChild(initTable());
    wrapper.appendChild(initButton(SwitchToMainPage));
    return wrapper;
}

function initTable() {
    let table = document.createElement('table');
    let thead = document.createElement('thead');
    let tbody = document.createElement('tbody');
    thead.appendChild(initFirstRow());
    tbody.appendChild(initSecondRow());
    tbody.appendChild(initThirdRow());
    table.appendChild(thead);
    table.appendChild(tbody);
    table.appendChild(initRow());
    return table;
}

function initFirstRow() {
    let row_1 = document.createElement('tr');
    let heading_2 = document.createElement('th');
    heading_2.innerHTML = 'Name';
    let heading_3 = document.createElement('th');
    heading_3.innerHTML = 'Score';
    row_1.appendChild(heading_2);
    row_1.appendChild(heading_3);
    return row_1;
}

function initRow() {
    let row = document.createElement('tr');
    row.appendChild(initRowData(localStorage.getItem('user-name')));
    row.appendChild(initRowData(localStorage.getItem('user-score')));
    return row;
}

function initRowData(score) {
    let rowData = document.createElement('td');
    rowData.innerHTML = score;
    return rowData;
}

function initSecondRow() {
    let row_2 = document.createElement('tr');
    let row_2_data_2 = document.createElement('td');
    row_2_data_2.innerHTML = "James";
    let row_2_data_3 = document.createElement('td');
    row_2_data_3.innerHTML = "6";
    row_2.appendChild(row_2_data_2);
    row_2.appendChild(row_2_data_3);
    return row_2;
}

function initThirdRow() {
    let row_3 = document.createElement('tr');
    let row_3_data_2 = document.createElement('td');
    row_3_data_2.innerHTML = "Adam";
    let row_3_data_3 = document.createElement('td');
    row_3_data_3.innerHTML = "3";
    row_3.appendChild(row_3_data_2);
    row_3.appendChild(row_3_data_3);
    return row_3;
}

//about-game-page
function initAboutGamePage() {
    let wrapper = document.getElementById('wrapper');
    wrapper.className = 'wrapper';
    wrapper.appendChild(initRulesLogo());
    wrapper.appendChild(initHistory());
    wrapper.appendChild(initButton(SwitchToMainPage));
}

function initHistory() {
    let history = document.createElement('div');
    history.className = 'history';
    let historyHeading = document.createElement('div');
    historyHeading.className = 'history-heading';
    let h2 = document.createElement('h2');
    h2.textContent = 'About Game';
    historyHeading.appendChild(h2);
    let historyInfo = document.createElement('div');
    historyInfo.className = 'history-info';
    let h3 = document.createElement('h3');
    h3.textContent = 'History';
    historyInfo.appendChild(h3);
    let historyText = document.createElement('div');
    historyText.className = 'history-text';
    let p = document.createElement('p');
    p.textContent = '"Frogger - видеоигра жанра аркада-головоломка, разработанная компанией Konami и выпущенная' +
        'компаниями Sega и Gremlin Industries для аркадных автоматов в июне 1981 года в Японии и в октябре того же ' +
        'года в Европе. Игра стала очень популярной и продолжает переиздаваться для многих игровых систем и' +
        'компьютеров. Различные версии игры выходили и продолжают выходить на многих игровых системах и персональных' +
        'компьютерах. В целом Frogger получил очень высокие, часто даже максимально высокие оценки во многих рецензиях.' +
        'Сравнительно невысоко были оценены версии игры для Xbox 360, Atari 5200 и Intellivision.';
    historyText.appendChild(p);
    history.appendChild(historyHeading);
    history.appendChild(historyInfo);
    history.appendChild(historyText);
    return history;
}

//Game-page
function initGame() {
    let wrapper = document.getElementById('wrapper');
    console.log(wrapper);
    // let game = document.createElement('div');
    // game.className = 'game';
    // game.id = 'game';
    wrapper.appendChild(initCanvas('canvas1'));
    wrapper.appendChild(initCanvas('canvas2'));
    wrapper.appendChild(initCanvas('canvas3'));
    wrapper.appendChild(initCanvas('canvas4', 'score-board'));
    wrapper.appendChild(initCanvas('canvas5'));
    wrapper.appendChild(initButton(SwitchToMainPage));
    initScoreBoard('score-board', 'score-board');
    //wrapper.appendChild(game);

}

function initCanvas(id, className) {
    let canvas = document.createElement('canvas');
    canvas.id = id;
    canvas.className = className;

    // if (window.innerWidth < 700) {
    //     for (let i = 0; i < canvas.length; i++) {
    //         canvas.width = window.innerWidth;
    //         canvas.height = window.innerHeight;
    //     }
    // }

    // canvas.style.width = '100%';
    // canvas.style.height = '100%';

    return canvas;
}



// function resize() {
//     let canvass = document.getElementsByTagName('canvas');
//     let canvasRatio = canvass.height / canvass.width;
//     let windowRatio = window.innerHeight / window.innerWidth;
//
//
//     if (windowRatio < canvasRatio) {
//         let height = window.innerHeight;
//         let width = height / canvasRatio;
//         canvass.style.width = width + 'px';
//         canvass.style.height = height + 'px';
//     } else {
//         let width = window.innerWidth;
//         let height = width * canvasRatio;
//         canvass.style.width = width + 'px';
//         canvass.style.height = height + 'px';
//     }
//
//
// }

//window.addEventListener('resize', resize, false);
// resizeCanvas();
// function resizeCanvas() {
//     let game = document.getElementById('game');
//     if (window.innerWidth < 600) {
//         game.style.width = '500px';
//         game.style.height = '500px';
//         console.log(game);
//     } else {
//         game.style.width = '600px';
//         game.style.height = '600px';
//         console.log(game);
//     }
//
//     let windowWidth = window.innerWidth;
//     let windowHeight = window.innerHeight;
//
//
//         // console.log(canvas.width);
//         // console.log(canvas.height);
//     // if (canvas) {
//     //     canvas.width = innerWidth;
//     //     canvas.height = innerHeight;
//     // }
// }

// let dimensions = {
//     max: {
//         width: 600,
//         height: 600
//     },
//     min: {
//         width: 300,
//         height: 300
//     }
// }