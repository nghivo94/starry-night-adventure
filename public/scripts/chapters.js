/**
 * @description represents a chapter
 * @param {Number} order the order of the chapter
 * @param {String} title the title of the chapter
 * @param {String} description the description of the chapter
 */
class Chapter {

    //BASIC FUNCTIONALITIES OF CHAPTER INSTANCES
    constructor(order, title, description) {
        //Fixed attributes
        /**@type {Number} */
        this.order = order;
        /**@type {String} */
        this.title = title;
        /**@type {String} */
        this.description = description;

        let world = undefined;
        this.getWorld = () => {return world;}
        this.setWorld = (newWorld) => {world = newWorld;}

        //Starting status attribute, setters and getter
        /**
         * Status of a chapter
         * @param {Int} started status "start" of a chapter, default 0
         * @param {Int} reached status "reach" of a chapter, default 0
         * @param {Int} finished status "finish" of a chapter, default 0
         */
        let status = {
            "started": 0,
            "reached": 0,
            "finished": 0
        };
        this.start = (world) => {
            status["started"] = 1;
            status["reached"] = 1;
            this.setWorld(world);
        }
        this.reStart = () => {
            status["started"] = 1;
            return this.getWorld();
        }
        this.resetStart = () => {
            status["started"] = 0;
        }
        this.finish = () => {
            status["finished"] = 1;
        }
        this.getStatus = () => {return {...status};}
        Object.freeze(this);

    }


    /**
     * Get all information required for game progression
     * @returns {{chapter: String, title: String, description: String}} basic information about a chapter
     */
    getFunctionInfo () {
        return {
            "chapter": "Chapter " + this.order,
            "title": this.title,
            "description": this.description
        }
    }

    /**
     * Get information of a chapter for saving purposes
     * @returns {{started: Number, reached: Number, world: *}} Object with status "started" and "reached": value 0 or 1, and "world": stringified value of saved world status for the chapter
     */
    getSaving () {
        return {
            "started": this.getStatus()["started"],
            "reached": this.getStatus()["reached"],
            "finished": this.getStatus()["finished"],
            "world": this.getWorld()
        };
    }

    //Basic functionalities of Chapter instances are completed.

    //FUNCTIONALITIES TO MANAGE CHAPTER INSTANCES
    /**
     * @description get saving information of provided chapters
     * @param {Array<Chapter>} chapters 
     * @returns {{chapterOrder: {started: Number, reached: Number, world: *}}} Object with keys being the chapter order and values being the saving information for each chapter
     */
    static getSaving (chapters) {
        const chapterSaving = {};
        chapters.forEach((chapter) => {chapterSaving[chapter.order] = chapter.getSaving();});
        return chapterSaving;
    }

    /**
     * @description replay a certain chapter
     * @param {Array<Chapter>} chapters all provided chapters
     * @param {Number} replayedIndex index of the chapter to replay
     * @returns {*} starting world status of the chapter to replay 
     */
    static replayChapter (chapters, replayedIndex) {
        for (let i = 0; i<chapters.length; i++) {
            if (i <= replayedIndex) { //If a chapter is before the replayed chapter, update "started" status of those chapters
                chapters[i].reStart();
            }
            else { //Else, reset the "started" status of that chapter
                chapters[i].resetStart();
            }
        }
        return chapters[replayedIndex].getSaving()["world"];
    }

    /** 
     * @description get information about the reached chapters, used for archives or let users choose replayable chapters
     * @param {Array<Chapter>} chapters all provided chapters
     * @returns {{chapterOrder: {chapter: String, title: String, description: String}}}  Object with keys being the chapter order and values being the basic information for each chapter
    */
    static getReachedChapters (chapters) {
        const result = []
        chapters.forEach((chapter) => {
            if (chapter.isReached()) { //If the chapter is reached, add the basic information of that chapter
                result.push(chapter.getInfo());
            }
            else result.push(undefined); //Else, add "undefined" in place of that chapter
        })
        return result;
    }
}

//Export Chapter class, including basic instances functionalities, and management functionalities
export { Chapter }