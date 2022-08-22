import { world } from "./world.js";

document.querySelector("#background-music").volume = 0.1;

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
    const descriptionPane = document.querySelector("#description-pane")
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