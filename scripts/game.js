import { world } from "./world.js";

document.querySelector("#background-music").volume = 0.1;

function init () {
    setTimeout(() => {
        document.querySelector(".loading-page").style.display = "none";
        const initResult = world.init();
        renderChapter(initResult.chapter);
        renderWhole(initResult.viewTitle, initResult.view, initResult.line);
    }, 7000);
}

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

function renderWhole (viewTitle, view, line) {
    document.querySelector(".title").textContent = viewTitle;
    document.querySelector("#description-pane").innerHTML = view;
    document.querySelector("#log-pane").innerHTML = line;
}

init();