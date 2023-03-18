//Class Effect

/**
 * Effect Type definition
 * @description represents an effect by internal game elements (i.e. interactives, characters, ...)
 * @abstract
 * @property {Object} info - Information about the effect
 */
class Effect {
    constructor (info) {
        if (Object.getPrototypeOf(this).hasOwnProperty("abstract")) {
            throw new Error("Can't instantiate abstract class!");
        }
    }

    /**
     * @description requests a list of targets to perform certain actions
     * @abstract
     * @returns {Array<{type: String, target: String}>} a list of targeted objects
     */
    requestTargets () {
        throw new Error("Added abstract Method has no implementation");
    }

    /**
     * @description perform effects on provided targets
     * @abstract
     * @param {Array<Object>} targets a list of targets to perform effects on
     * @returns {Boolean} True if the effect is successfully carried out, False otherwise (especially for Require effect)
     */

    performEffect (targets) {
        throw new Error("Added abstract Method has no implementation");
    }
}

Effect.prototype.abstract = true;

export { Effect }