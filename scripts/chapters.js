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

        //Starting status attribute, setters and getter
        /**
         * Status of a chapter
         * @param {Int} started status "start" of a chapter, default 0
         * @param {Int} reached status "reach" of a chapter, default 0
         */
        this._status = {
            "started": 0,
            "reached": 0,
        }
        
        //Saved World attribute, setter and getter
        this._world = undefined;
    }


    /**
     * Get information about a chapter for in-game displaying purposes
     * @returns {{chapter: String, title: String, description: String}} basic information about a chapter
     */
    getInfo () {
        return {
            "chapter": "Chapter " + this.order,
            "title": this.title,
            "description": this.description
        }
    }

    /**
     * Check if the chapter is started in the current game
     * @returns {Boolean} True if the chapter is started in the current game, False otherwise
     */
    isStarted () {return this._status["started"] === 1;}

    /**
     * Check if the user (browser-based) has reached a chapter
     * @returns {Boolean} True if the user (browser-based) has reached the chapter, False otherwise
     */
    isReached () {return this._status["reached"] === 1;}

    /**
     * Check if a chapter has been finished before
     * @returns {Boolean} True if the chapter has been finished before
     */
    isFinished () {
        if (this._world) { //If the chapter has a saved world status, it has been finished before
            return true;
        }
        return false;
    }

    /**
     * Get information of a chapter for saving purposes
     * @returns {{started: Number, reached: Number, world: *}} Object with status "started" and "reached": value 0 or 1, and "world": stringified value of saved world status for the chapter
     */
    getSaving () {
        return {
            "started": this._status["started"],
            "reached": this._status["reached"],
            "world": this._world
        };
    }

    /**
     * @description update "started" status and save starting world of a chapter
     * @param {*} world 
     */

    start (world) {
        this._status["started"] = 1;
        this._world = world;
    }

    /**
     * @description update "started" status of a chapter, used when user restart a later chapter
     */
    restart () {
        this._status["started"] = 1;
    }

    /**
     * @description reset "started" status of a chapter, used when user restart a previous chapter
     */

    resetStart () {
        this._status["started"] = 0;
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
                chapters[i].restart();
            }
            else { //Else, reset the "started" status of that chapter
                chapters[i].resetStart();
            }
        }
        return chapters[replayedIndex].getSaving().world;
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