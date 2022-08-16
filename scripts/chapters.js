//Initialization: an array to store chapters and 
//  a variable to store current chapter index
const chapters = [];
let currentChapter = 0;

//Get starting status of all chapters
function getStatus() {
    const chapterStatus = {};
    chapters.forEach((chapter) => {chapterStatus[chapter.order] = chapter.isStarted();});
    return chapterStatus;
}

//Get saved world from all previously completed chapters
function getCheckpoints () {
    const checkPoints = {};
    chapters.forEach((chapter) => {checkPoints[chapter.order] = chapter.getSaved();});
    return checkPoints;
}

//Chapter class
class Chapter {
    constructor(order, title, description) {
        //Fixed attributes
        this.order = order;
        this.title = title;
        this.description = description;

        //Starting status attribute, setters and getter
        let started = 0;
        this.isStarted = () => {return started===1;}
        this.start = () => {started = 1;}
        this.restart = () => {started = 0;}
        
        //Saved World attribute, setter and getter
        let savedWorld = undefined;
        this.getSaved = () => {return savedWorld;}
        this.save = world => {savedWorld = world;}
        
        //Make object (fixed attributes) immutable
        Object.freeze(this);
    }
    
    //Start the chapter next to the previously completed (finished) chapter
    static startChapter () {
        chapters[currentChapter].start();
        return {
            chapter: "Chapter " + chapters[currentChapter].order,
            title : chapters[currentChapter].title,
            chapterStatus: getStatus()
        };
    }

    //Finish the current chapter and save the current world status
    static finishChapter (world) {
        chapters[currentChapter].save(world);
        currentChapter += 1;
        return getCheckpoints();
    }

    //Get all the replayable chapters, with order, title and description
    static replayableChapters () {
        const result = {};
        chapters.forEach((chapter) => {
            if (chapter.getSaved()) {
                result[chapter.order] = {
                    chapter: "Chapter " + chapter.order,
                    title: chapter.title,
                    description: chapter.description
                }
            }
        });
        return result;
    }

    //Replay a chosen chapter, return chapter, title, chapterStatus of all chapters, 
    // and world state saved in the chosen chapter
    static replayChapter (chapter) {
        if (!chapters[chapter].getSaved()) {
            return undefined; //Return undefined if chosen chapter is not replayable
        }
        chapters.forEach((chapter) => {chapter.restart();})
        currentChapter = chapters[chapter];
        return {
            chapter: "Chapter " + chapters[currentChapter].order,
            title : chapters[currentChapter].title,
            chapterStatus: getStatus(),
            worldState: chapters[currentChapter].getSaved()
        };
    }

    //Get all reached (played or started) chapters for archive.
    static getChapters () {
        const result = {};
        chapters.forEach((chapter) => {
            if (chapter.getSaved() || chapter.isStarted()) {
                result[chapter.order] = {
                    chapter: "Chapter " + chapter.order,
                    title: chapter.title,
                    description: chapter.description
                }
            }
        });
        return result;
    }
}

chapters.push(
    new Chapter(0, "Of Coincidences and Encounter", ""), 
    new Chapter(1, "Of Anthem and Flames", ""), 
    new Chapter(2, "Of Stars and Destiny", ""), 
    new Chapter(3, "Of Gold and Illusion", ""), 
    new Chapter(4, "Of Alchemy and Memory", ""),
    new Chapter(5, "Of Flowers and Virtue", ""),
    new Chapter(6, "Of Kings and Pawns", ""));

Object.freeze(chapters);

export { Chapter }