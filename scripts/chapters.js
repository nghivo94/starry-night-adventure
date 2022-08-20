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
    
    //Get all the replayable chapters, with order, title and description
    isReplayable () {
        if (this.getSaved()) {
            return true
        }
        return false
    }

    getInfo () {
        return {
            chapter: "Chapter " + this.order,
            title: this.title,
            description: this.description
        }
    }

    static getStatus(chapters) {
        const chapterStatus = {};
        chapters.forEach((chapter) => {chapterStatus[chapter.order] = chapter.isStarted();});
        return chapterStatus;
    }

    static getCheckpoints (chapters) {
        const checkPoints = {};
        chapters.forEach((chapter) => {checkPoints[chapter.order] = chapter.getSaved();});
        return checkPoints;
    }

    static getKnownChapters (chapters) {
        const result = []
        chapters.forEach((chapter) => {
            if (chapter.isReplayable() || chapter.isStarted()) {
                result.push(chapter.getInfo())
            }
            else result.push(undefined)
        })
        return result
    }

    static getReplayableChapters (chapters) {
        const result = []
        chapters.forEach((chapter) => {
            if (chapter.isReplayable() || chapter.isStarted()) {
                result.push(chapter.getInfo())
            }
        })
        return result
    }
}

export { Chapter }