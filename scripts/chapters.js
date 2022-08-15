const chapters = [];
let currentChapter = 0;

class Chapter {
    constructor(order, title) {
        this.order = order;
        this.title = title;

        let started = 0;
        this.isStarted = () => {return started===1;}
        this.start = () => {started = 1;}
        
        let savedWorld = undefined;
        this.getSaved = () => {return savedWorld;}
        this.save = world => {savedWorld = world;}
        
        Object.freeze(this);
    }

    static finishChapter (world) {
        chapters[currentChapter].save(world);
        const checkPoints = {};
        for (let i=0; i<chapters.length; i++) {
            checkPoints[i] = chapters[i].getSaved();
        }
        console.log(checkPoints);
        currentChapter += 1;
    }

    static startChapter () {
        chapters[currentChapter].start();
        const chapterStatus = {};
        for (let i=0; i<chapters.length; i++) {
            chapterStatus[i] = chapters[i].isStarted();
        }
        console.log(chapterStatus);
        return {
            "chapter": "Chapter " + chapters[currentChapter].order,
            "title": chapters[currentChapter].title
        };
    }

    static replayChapter (chapter) {

    }
}

chapters.push(
    new Chapter(0, "Encounter"), 
    new Chapter(1, "Of Anthem and Flames"), 
    new Chapter(2, "Of Stars and Destiny"), 
    new Chapter(3, "Of Gold and Illusion"), 
    new Chapter(4, "Of Alchemy and Memory"),
    new Chapter(5, "Of Flowers and Virtue"),
    new Chapter(6, "Of Kings and Pawns"));

Object.freeze(chapters);

export { Chapter }