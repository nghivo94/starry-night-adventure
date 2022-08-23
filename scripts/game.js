import { world, World } from "./world.js";

document.querySelector("#background-music").volume = 0.1;

//Using MVC

class Model {
    constructor() {
        this.world = new World();
        this.helpMessage = [
            `Welcome to StarryNightAdventure. Here's some useful commands for you to use: `,
            {
                'list-title': 'General commands',
                'list-items': [
                    {
                        'item-command': 'replay',
                        'item-description': 'Replay chapters you have reached'
                    },
                    {
                        'item-command': 'quit',
                        'item-description': 'Quit current game'
                    },
                    {
                        'item-command': 'help',
                        'item-description': 'Show instructions'
                    },
                    {
                        'item-command': 'inventory',
                        'item-description': `Show items you currently have. Type 'inventory' or use Ctrl+I.`
                    },
                    {
                        'item-command': 'map',
                        'item-description': `Show the map of areas you have explored. Type 'map' or use Ctrl+M.`
                    }
                ]
            },
            {
                'list-title': 'Movement commands',
                'list-items': [
                    {
                        'item-command': 'go north/west/south/east',
                        'item-description': `Move to different areas, if there is a path or unlocked door. 
                        Type or use access keys: UP (North), DOWN (South), LEFT (East), RIGHT (West).
                        Can only be used when player is not examining / interacting / talking.`
                    },
                    {
                        'item-command': 'enter room I/room II/shop',
                        'item-description': `Enter different rooms, can only be used in the corridor, when player is not examining / interacting / talking.`
                    }
                ]
            },
            {
                'list-title': 'Object commands',
                'list-items': [
                    {
                        'item-command': 'get *item name*',
                        'item-description': `Get an item`
                    },
                    {
                        'item-command': 'examine *item name*',
                        'item-description': `Examine an item`
                    },
                    {
                        'item-command': 'interact *object name*',
                        'item-description': `Interact with an ungettable object`
                    },
                    {
                        'item-command': 'use *item name*',
                        'item-description': `Use an item when interacting`
                    },
                    {
                        'item-command': 'answer *input*',
                        'item-description': `Answer a puzzle / riddle when interacting`
                    },
                    {
                        'item-command': 'back',
                        'item-description': `Stop interacting / examining. Type 'back' or use Ctrl + X.`
                    }
                ]
            },
            {
                'list-title': 'Character commands',
                'list-items': [
                    {
                        'item-command': 'talk',
                        'item-description': `Talk to a character if there is a character in your current area.
                        Can be used only if player is not interacting / examining. Type 'talk' or use Ctrl + T.`
                    },
                    {
                        'item-command': 'choose *1 / 2/ ...*',
                        'item-description': `Choose a dialog option. Can be used only when player is talking.`
                    },
                    {
                        'item-command': 'use *item name*',
                        'item-description': `Use an item when talking`
                    }
                ]
            },
            `Use CTRL + Z to close popup screen.`
        ];
        this.loadingLines = [`"In a way, time is a tragic concept.`, `Moving forwards, passing crossroads, yet there is no going back."`];
    }
}


class View {
    constructor() {
        this.body = document.querySelector('body');
        const main = document.querySelector('main');
        
        const description = document.createElement('div');
        description.classList.add('description');
        main.appendChild(description);

        this.viewTitle = document.createElement('div');
        this.viewTitle.classList.add('title');
        this.viewTitle.textContent = "Title";
        this.descriptionPane = document.createElement('div');
        this.descriptionPane.classList.add('content');
        this.descriptionPane.id = 'description-pane';

        description.appendChild(this.viewTitle);
        description.appendChild(this.descriptionPane);

        const controlPanel = document.createElement('div');
        controlPanel.classList.add('control-panel');
        main.appendChild(controlPanel);

        const controls = document.createElement('div');
        controls.classList.add('controls');
        controlPanel.appendChild(controls);

        const movementContainer = document.createElement('div');
        movementContainer.classList.add('movement-container');
        controls.appendChild(movementContainer);

        const movement = document.createElement('div');
        movement.classList.add('movement');
        movementContainer.appendChild(movement);

        this.northButton = this._createIconButton('n-button', 'direction', 'fa-solid fa-arrow-up');
        this.westButton  = this._createIconButton('w-button', 'direction', 'fa-solid fa-arrow-left');
        this.southButton = this._createIconButton('s-button', 'direction', 'fa-solid fa-arrow-down');
        this.eastButton  = this._createIconButton('e-button', 'direction', 'fa-solid fa-arrow-right');
        movement.appendChild(this.northButton);
        movement.appendChild(this.westButton);
        movement.appendChild(this.southButton);
        movement.appendChild(this.eastButton);

        const commands = document.createElement('div');
        commands.classList.add('commands');
        controls.appendChild(commands);

        this.replayButton    = this._createIconButton('replay-button', 'auxiliary', 'fa-solid fa-arrow-rotate-right');
        this.quitButton      = this._createIconButton('quit-button', 'auxiliary', 'fa-solid fa-xmark');
        this.helpButton      = this._createIconButton('help-button', 'auxiliary', 'fa-solid fa-question');
        this.inventoryButton = this._createIconButton('inventory-button', 'auxiliary', 'fa-solid fa-box-open');
        this.mapButton       = this._createIconButton('map-button', 'auxiliary', 'fa-solid fa-map-location-dot');
        commands.appendChild(this.replayButton);
        commands.appendChild(this.quitButton);
        commands.appendChild(this.helpButton);
        commands.appendChild(this.inventoryButton);
        commands.appendChild(this.mapButton);
        
        const textCommand = document.createElement('div');
        textCommand.classList.add('text-command');
        controlPanel.appendChild(textCommand);

        const label = document.createElement('label');
        textCommand.appendChild(label);
        const icon = document.createElement('i');
        icon.className = 'fa-solid fa-angle-right';
        label.appendChild(icon);

        this.command = document.createElement('input');
        this.command.id = 'command';
        this.command.type = 'text';
        this.command.placeholder = "Type your command...";
        label.appendChild(this.command);

        this.logPane = document.createElement('div');
        this.logPane.classList.add('çontent');
        this.logPane.id = 'log-pane';
        textCommand.appendChild(this.logPane);

        document.querySelector(':root').appendChild(main);
    }

    _createIconButton (id, className, iconName) {
        const icon = document.createElement('i');
        icon.className = iconName;
        const button = document.createElement('button');
        button.classList.add(className);
        button.id = id;
        button.appendChild(icon);
        return button;
    }

    renderChapter (chapter) {
        const chapterOrder = document.createElement('h1');
        const chapterTitle = document.createElement('h2');
        chapterOrder.textContent = chapter["chapter"];
        chapterTitle.textContent = chapter["title"];

        const chapterPane = document.createElement('div');
        chapterPane.classList.add("chapter");

        chapterPane.appendChild(chapterOrder);
        chapterPane.appendChild(document.createElement('hr'));
        chapterPane.appendChild(chapterTitle);
        
        this.body.appendChild(chapterPane).focus();
        chapterPane.style.opacity = 1;

        setTimeout(() => {
            chapterPane.style.opacity = 0;
            setTimeout(() => {
                this.body.removeChild(chapterPane);
            }, 500);
        },1800);
    }

    renderLoading (loadingLines) {
        const bar          = document.createElement('hr');
        const barContainer = document.createElement('div');
        barContainer.classList.add('bar-container');
        barContainer.appendChild(bar);

        const loadingPage = document.createElement('div');
        loadingPage.classList.add('loading-page');
        loadingPage.appendChild(barContainer);

        loadingLines.forEach((line) => {
            const lineText = document.createElement('div');
            lineText.classList.add('ontop-text');
            lineText.textContent = line;
            loadingPage.appendChild(lineText);
        });

        this.body.appendChild(loadingPage);
        setTimeout(()=>{
            this.body.removeChild(loadingPage);
        }, 7000);
    }

    _renderPopUp (popUpElement) {
        const popUpScreen = document.createElement('div');
        popUpScreen.classList.add('pop-up-screen');
        popUpScreen.appendChild(popUpElement);

        this.body.appendChild(popUpScreen).focus();
        this.popUpScreen.style.opacity = 1;
    }

    removePopUp() {
        this.popUpScreen.style.opacity = 0;
        setTimeout(() => {
            this.popUpScreen.style.zIndex = -1;
        }, 300);
    }

    
    renderHelp() {
        this._renderPopUp();
        setTimeout(()=>{popUp[0].style.display='block'},300);
    }
}


class Controller {
    constructor(model, view) {
        this.model = model;
        this.view  = view;
    }

    init () {
        this.view.renderLoading(this.model.loadingLines);
        setTimeout(()=>{
            this.view.renderChapter({
                "chapter": "Chapter 0",
                "title": "Of Concidences and Manuscript"
            })
        }, 7000);
    }
}

const app = new Controller(new Model(), new View());
app.init();


/*
function saveData (entries) {
    entries.forEach((entry) => {
        localStorage.setItem(entry["key"], JSON.stringify(entry["value"]));
    });
}

function processCommand (command) {
    const appropriateRegex = /^([A-Z0-9]|\s)+$/i
    const verbRegex = /^[A-Z]+/i
    if (appropriateRegex.test(command) && verbRegex.test(command)) {
        const verb = command.match(verbRegex)[0];
        let modifier = undefined;
        if (command.length > verb.length) {
            modifier = command.substring(verb.length);
        }
        switch (verb.toLowerCase()) {
            case "help":
                renderHelp();
                break;
            default:
                break;
        }
    }
    else {
        renderLine(`
            <p>In appropriate input, please only enter alphabet characters.</p>
        `)
    }
}

function init () {
    setTimeout(() => {
        document.querySelector(".loading-page").style.display = "none";
        const initResult = world.init();
        renderChapter(initResult["chapter"]);
        renderBasic(initResult["viewTitle"], initResult["view"], initResult["line"]);
        renderChoices (initResult["choices"]);
        saveData(initResult["save"]);
    }, 7000);
}



//Control
document.querySelector("#command").addEventListener('keypress', (e) => {
    if (e.key == 'Enter') {
        processCommand(document.querySelector("#command").value.trim());
    }
});
document.querySelector("#help-button").addEventListener('click', () => {
    renderHelp();
})
document.addEventListener('keydown', function(event) {
    if (event.ctrlKey && event.key === 'z') {
      removePopUp();
    }
});
document.querySelectorAll(".pop-up-control button").forEach((button) => {
    button.addEventListener('click', removePopUp);
});



//Rendering
function renderChapter (chapter) {
    document.querySelector(".chapter h1").textContent = chapter.chapter;
    document.querySelector(".chapter h2").textContent = chapter.title;
    
    const chapterPane = document.querySelector(".chapter");
    chapterPane.style.zIndex = 1;
    chapterPane.style.opacity = 1;
    setTimeout(() => {
        chapterPane.style.opacity = 0;
        setTimeout(() => {
            chapterPane.style.zIndex = -1;
        }, 600)
    },1800);
}

function renderHelp () {
    const popupScreen = document.querySelector(".pop-up-screen");
    popupScreen.style.zIndex = 1;
    popupScreen.style.opacity = 1;
}

function removePopUp () {
    const popupScreen = document.querySelector(".pop-up-screen");
    popupScreen.style.opacity = 0;
    setTimeout(() => {
        popupScreen.style.zIndex = -1;
    }, 300);
}

function renderBasic (viewTitle, view, line) {
    document.querySelector(".title").textContent = viewTitle;
    document.querySelector("#description-pane").innerHTML = view;
    document.querySelector("#log-pane").innerHTML = line;
}

function renderLine (line) {
    document.querySelector("#log-pane").innerHTML = line;
}

function renderChoices (choices) {
    const descriptionPane = document.querySelector("#description-pane");
    descriptionPane.innerHTML += `
        <p class="note">Choose an option or use text command 'choose 1/2/3...' to choose an option.</p>
    `
    descriptionPane.innerHTML += `
        <p>Choices: </p>
    `
    let choiceNumber = 1;
    choices.forEach((choice) => {
        descriptionPane.innerHTML += `
        <label><input type="radio" name="choice" value="${choiceNumber}"/>${choice}</label>`
        choiceNumber += 1;
    });
    descriptionPane.innerHTML += `
        <button id="choose">Choose</button>
    `
}

init();
*/