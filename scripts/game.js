import { world, World } from "./world.js";

document.querySelector("#background-music").volume = 0.1;

//Using MVC

class Model {
    constructor(controller) {
        this._controller = controller;
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

    init() {
        return this.world.init();
    }
}

//View
class View {
    constructor(controller) {
        this._controller = controller;
        this.body = document.querySelector('body'); //String body for later addition

        //HTML Structuring
        const main = document.querySelector('main');
        
        const description = document.createElement('div');
        description.classList.add('description');
        main.appendChild(description);

        this.descriptionPane = document.createElement('div');
        this.descriptionPane.classList.add('content');
        this.descriptionPane.id = 'description-pane';

        this.viewTitle = document.createElement('div');
        this.viewTitle.classList.add('title');

        this.view = document.createElement('div');
        this.view.classList.add('view');
        this.descriptionPane.appendChild(this.view);

        this.choices = document.createElement('div');
        this.choices.classList.add('choices');
        this.descriptionPane.appendChild(this.choices);

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
        this.logPane.classList.add('content');
        this.logPane.id = 'log-pane';
        textCommand.appendChild(this.logPane);

        document.querySelector(':root').appendChild(main);

        /*At the final stage, the View class now has:
        body, viewTitle, descriptionPane, movementButtons, auxiliaryButtons, command, and logPane
        */
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

    _renderElement (elementInfo) {
        const element = document.createElement(elementInfo["tag"]);
        if (elementInfo["class"]) {
            element.className = elementInfo["class"];
        }
        if (elementInfo["text"]) {
            element.textContent = elementInfo["text"];
        }
        if (elementInfo["src"]) {
            element.src = elementInfo["src"];
        }
        if (elementInfo["children"]) {
            elementInfo["children"].forEach((child) => {
                element.appendChild(this._renderElement(child));
            });
        }
        return element;
    }

    //Rendering a chapter info pane by creating a full-screen pane with chapter name and title
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

        //Make the pane appear for certain amount of time then remove it
        chapterPane.style.opacity = 1;

        setTimeout(() => {
            chapterPane.style.opacity = 0;
            setTimeout(() => {
                this.body.removeChild(chapterPane);
            }, 500);
        },1800);
    }

    resetRender () {
        this.viewTitle.innerHTML = '';
        this.view.innerHTML = '';
        this.choices.innerHTML = '';
    }

    renderViewTitle (title) {
        this.viewTitle.textContent = title;
    }

    renderView (view) {
        this.view.innerHTML = '';
        view.forEach((nodeInfo) => {
            this.view.appendChild(this._renderElement(nodeInfo));
        });
    }

    renderChoices (choices) {
        this.choices.innerHTML = '';

        const choiceText = document.createElement('p');
        choiceText.textContent = "Choices: ";
        this.choices.appendChild(choiceText);

        for (let i=0; i < choices.length; i++) {
            const label = document.createElement('label');
            label.textContent = choices[i];
            this.choices.appendChild(label);

            const choiceInput = document.createElement('input');
            choiceInput.name = 'choice';
            choiceInput.value = ""+(i+1);
            choiceInput.type = 'radio';
            label.prepend(choiceInput);
        }

        const chooseButton = document.createElement('button');
        chooseButton.id = 'choose';
        chooseButton.textContent = "Choose";
        this.choices.appendChild(chooseButton);

        const noteText = document.createElement('p');
        noteText.classList.add('note');
        noteText.textContent = `Choose an option or type 'choose 1/2/...'`;
        this.choices.appendChild(noteText);
    }

    renderLine (lines) {
        this.logPane.innerHTML = '';
        lines.forEach((nodeInfo) => {
            this.logPane.appendChild(this._renderElement(nodeInfo));
        });
    }

    //Rendering a loading page by creating a full-screen page with some loading lines
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

        //Making the page appear for a certain amount of time then remove it
        this.body.appendChild(loadingPage);
        setTimeout(()=>{
            this.body.removeChild(loadingPage);
        }, 7000);
    }

    //Private function to render a full-screen Pop up screen with a popup element at the center
    _renderPopUp (popUpElement) {
        const popUpScreen = document.createElement('div');
        popUpScreen.classList.add('pop-up-screen');
        popUpScreen.appendChild(popUpElement);

        this.body.appendChild(popUpScreen).focus();
        popUpScreen.style.opacity = 1;
    }

    removePopUp() {
        const popUpScreen = document.querySelector('.pop-up-screen');
        popUpScreen.style.opacity = 0;
        setTimeout(() => {
            this.body.removeChild(popUpScreen);
        }, 300);
    }

    
    renderHelp(modelHelpMessage) {
        const helpPopUp = document.createElement('div');
        helpPopUp.classList.add('help');
        helpPopUp.classList.add('pop-up');

        const popUpControl = document.createElement('div');
        popUpControl.classList.add('pop-up-control');
        popUpControl.textContent = "Help";

        const popUpButton = document.createElement('button');
        popUpButton.classList.add('pop-up-button');
        const buttonIcon = document.createElement('i');
        buttonIcon.className = 'fa-solid fa-xmark';
        popUpButton.appendChild(buttonIcon);
        popUpControl.appendChild(popUpButton);
        helpPopUp.appendChild(popUpControl);

        const helpMessage = document.createElement('div');
        helpMessage.classList.add('help-message');
        helpPopUp.appendChild(helpMessage);

        let node = document.createElement('p');
        node.textContent = modelHelpMessage[0];
        helpMessage.appendChild(node);

        for (let i = 1; i < modelHelpMessage.length - 1; i++) {
            const title = document.createElement('h1');
            title.classList.add('list-name');
            title.textContent = modelHelpMessage[i]["list-title"];
            helpMessage.appendChild(title);

            const list = document.createElement('ul');
            modelHelpMessage[i]["list-items"].forEach((item) => {
                const ele = document.createElement('li');
                ele.textContent = `'${item["item-command"]}': ${item["item-description"]}`;
                list.appendChild(ele);
            });
            helpMessage.appendChild(list);
            helpMessage.appendChild(document.createElement('hr'));
        }

        node = document.createElement('p');
        node.textContent = modelHelpMessage[modelHelpMessage.length-1];
        node.classList.add('note');
        helpMessage.appendChild(node);

        this._renderPopUp(helpPopUp);
    }

    bindClosePopUp () {
        document.addEventListener('click', (event) => {
            if (event.target.className === 'pop-up-button') {
                this._controller.handleClosePopUp();
            }
        });
        document.addEventListener('keydown', (event) => {
            if (event.ctrlKey && event.key === 'z') {
                this._controller.handleClosePopUp();
            }
        });
    }

    bindCommand () {
        this.command.addEventListener('keypress', (e) => {
            if (e.key == 'Enter') {
                this._controller.handleCommand(this.command.value.trim());
            }
        });

        this._bindCommandHelp();
        this._bindCommandChoose();
    }

    _bindCommandHelp () {
        this.helpButton.addEventListener('click', () => {
            this._controller.handleCommand("help");
        });
        document.addEventListener('keydown', (event) => {
            if (event.ctrlKey && event.key === 'q') {
                this._controller.handleCommand("help");
            }   
        });
    }

    _bindCommandChoose () {
        document.addEventListener('click', (event) => {
            if (event.target.id == "choose") {
                let modifier = "";
                document.querySelectorAll('input[type="radio"]').forEach((input) => {
                    if (input.checked) {
                        modifier = input.value;
                    }
                });
                this._controller.handleCommand(("choose "+modifier).trim());
            }
        });
    }
}


class Controller {
    constructor() {
        this.model = new Model(this);
        this.view  = new View(this);
        this.view.bindClosePopUp();
        this.view.bindCommand();
    }

    init () {
        this.view.renderLoading(this.model.loadingLines);
        setTimeout(()=>{
            this._displayChange(this.model.init());
        }, 7000);
    }
    
    handleShowHelp () {
        this.view.renderHelp(this.model.helpMessage);
    }

    handleClosePopUp() {
        this.view.removePopUp();
    }

    handleCommand (command) {
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
                    this.view.renderHelp(this.model.helpMessage);
                    break;
                case "choose":
                    if (!modifier) {
                        console.log("Please choose an option");
                    }
                    else {
                        console.log("Choose" + modifier);
                    }
                    break;
                default:
                    this.view.renderLine([{
                        "tag": 'p',
                        "text": `Unrecognized command. Please try again or type 'help' to check command list.` 
                    }]);
                    break;
            }
        }
        else {
            this.view.renderLine([{
                "tag": 'p',
                "text": `Please only use alphabetic characters or numbers.` 
            }]);
        }
    }

    _displayChange (change) {
        if (change["chapter"]) {
            this.view.renderChapter(change["chapter"]);
        }
        if (change["viewTitle"]) {
            this.view.renderViewTitle(change["viewTitle"]);
        }
        if (change["view"]) {
            this.view.renderView(change["view"]);
        }
        if (change["lines"]) {
            this.view.renderLine(change["lines"]);
        }
        if (change["choices"]) {
            this.view.renderChoices(change["choices"]);
        }
    }
}

const app = new Controller();
app.init();