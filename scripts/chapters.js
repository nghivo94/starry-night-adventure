//Chapter class
class Chapter {
    constructor(order, title, description) {
        //Fixed attributes
        this.order = order;
        this.title = title;
        this.description = description;

        //Starting status attribute, setters and getter
        const status = {
            "started": 0,
            "reached": 0,
        }
        this.isStarted = () => {return status["started"]===1;}
        this.isReached = () => {return status["reached"]===1;}
        this.getStatus = () => {return status}
        this.start = () => {
            status["started"] = 1;
            status["reached"] = 1;
        }
        this.restart = () => {status["started"] = 0;}
        
        //Saved World attribute, setter and getter
        let saved = undefined;
        this.getSaved = () => {return saved;}
        this.save = (newsaved) => {saved = newsaved;}
        
        //Make object (fixed attributes) immutable
        Object.freeze(this);
    }
    
    //Check if a chapter is replayable (finished before)
    isReplayable () {
        if (this.getSaved()) {
            return true
        }
        return false
    }

    //Get chapter information
    getInfo () {
        return {
            "chapter": "Chapter " + this.order,
            "title": this.title,
            "description": this.description
        }
    }

    //Concat chapters status into one single string
    static getStatus(chapters) {
        const chapterStatus = {};
        chapters.forEach((chapter) => {chapterStatus[chapter.order] = chapter.getStatus();});
        return chapterStatus;
    }

    //Concat chapters checkpoint (saved world state) into one single string
    static getCheckpoints (chapters) {
        const checkPoints = {};
        chapters.forEach((chapter) => {checkPoints[chapter.order] = chapter.getSaved();});
        return checkPoints;
    }

    //Get known (reached)chapters into
    static getKnownChapters (chapters) {
        const result = []
        chapters.forEach((chapter) => {
            if (chapter.isReached()) {
                result.push(chapter.getInfo())
            }
            else result.push(undefined)
        })
        return result
    }
}

export { Chapter }