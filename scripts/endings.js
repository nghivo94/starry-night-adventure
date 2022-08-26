/**
 * @description represents one possible ending of the story
 * @param {String} title the title of the ending
 * @param {Array<Object>} view the displayed view of the ending
 * @param {String} description a short description about the ending
 */

class Ending {
    constructor (title, view, description) {
        /**@type {String} */
        this.title = title;
        /**@type {Array<Object>} */
        this.view = view;
        /**@type {String} */
        this.description = description;
        this._reached = 0;
    }

    /**
     * @description check if an ending is reached
     * @returns {Boolean} True if the ending is reached, False otherwise
     */
    isReached () {
        return this._reached === 1;
    }

    reach () {
        this._reached = 1;
    }

    getInfo () {
        return {
            "title": this.title,
            "description": this.description
        };
    }

    /**
     * @description get saving information of provided endings
     * @param {Array<Ending>} endings all provided endings
     * @returns {{endingTitle: Number}} Object with keys being the ending title and values being "reached" status of ending
     */

    static getSaving (endings) {
        const endingSaving = {};
        endings.forEach((ending) => {
            endingSaving[ending.title] = ending._reached;
        });
        return endingSaving;
    }


}