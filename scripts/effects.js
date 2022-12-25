//Class Effect

import { chapter_data } from "../data/chapter_data.js";
import { Chapter } from "./chapters.js";
import { Character } from "./characters.js";
import { Player } from "./player.js";

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

    /**
     * @description creates Effect instances based on subclasses using factory design patter
     * @param {String} type an indication of the type of Effect instance to create
     * @param {Object} info information about the target(s) of the Effect instance
     * @returns {Effect} an Effect instance
     */
    static create (type, info) {
        switch (type) {
            case "end":
                return new EndEffect(info);
            case "dialog":
                return new DialogEffect(info["character"], info["target-stage"]);
            case "talk":
                return new TalkEffect(info);
            case "put":
                return new PutEffect(info["item"], info["area"], info["interactive"]);
            case "require":
                return new RequireEffect(info["require-type"], info["require-target"], info["modifier"], info["failure-lines"] ,info["failure-effects"]);
            default:
                return undefined;
        }
    }
}

Effect.prototype.abstract = true;

class EndEffect extends Effect {
    constructor(ending) {
        super();
        /**@type {String} */
        this.ending = ending;
    }

    requestTargets () {
        return [
            {
                "type": "ending",
                "target": this.ending
            }
        ];
    }

    /**
     * @param {Array<Ending>} targets the list containing 1 ending element
     */
    performEffect (targets) {
        const ending = targets[0];
        ending.reach();
        return true;
    }
}

class DialogEffect extends Effect {
    constructor(character, targetStage) {
        super();
        this.character = character;
        this.targetStage = targetStage;
    }

    requestTargets () {
        return [
            {
                "type": "character",
                "target": this.character
            }
        ]
    }

    performEffect (targets) {
        /**@type {Character} */
        const character = targets[0];
        character.setStatus(this.targetStage);
        return true;
    }
}


class TalkEffect extends Effect {
    constructor(character) {
        super();
        this.character = character;
    }

    requestTargets () {
        return [
            {
                "type": "player",
                "target": "player"
            },
            {
                "type": "character",
                "target": this.character
            }
        ];
    }

    /**
     * 
     * @param {Array<Object>} targets list of targets, the first element being the player, and the second element being the character to talk to
     */
    performEffect (targets) {
        /**@type {Player}*/
        const player = targets[0];
        /**@type {Character} */
        const character = targets[1];
        player.talk(character.name);
        return true;
    }
}

class PutEffect extends Effect {
    constructor(item, area, interactive) {
        super();
        this.item = item;
        this.locationType = undefined;
        this.location = undefined
        if (area) {
            this.locationType = 0;
            this.location = area;
        }
        else {
            this.locationType = 1;
            this.location = interactive;
        }
    }

    requestTargets () {
        const result = [];
        result.push({
            "type": "item",
            "target": this.item
        });
        if (this.locationType === 0) {
            result.push({
                "type": "area",
                "target": this.location
            });
        }
        else {
            result.push({
                "type": "interactive",
                "target": this.location
            });
        }
        return result;
    }
}

class RequireEffect extends Effect {
    constructor(requireTarget, requireType, modifier, failureLines, failureEffects) {
        super();
        this.requireTarget = requireTarget;
        this.requireType = requireType;
        this.modifier = modifier;
        this.failureLines = failureLines;
        /**@type {Array<Effect>} */
        this.failureEffects = [];
        if (failureEffects) {
            failureEffects.forEach((effectInfo) => {
                this.failureEffects.push(Effect.create(effectInfo["type"], effectInfo["info"]));
            });
        }
    }

    requestTargets () {
        return [{
            "type": this.requireType,
            "target": this.requireTarget,
            "modifier": this.modifier
        }];
    }

    performEffect (targets) {
        switch (this.requireType) {
            case "chapter":
                /**@type {Chapter} */
                const chapter = targets[0];
                return chapter.isFinished();
            default:
                break;
        }
    }
}

export { Effect }