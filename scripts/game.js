import { world } from "./world.js";

const descriptionPane = document.querySelector("#description-pane");
const logPane = document.querySelector("#log-pane");
document.querySelector("#background-music").volume = 0;

function init () {
    const initResult = world.init();
    renderChapter(initResult.chapter);
    logPane.textContent = initResult.line;

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

init();