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
     * @returns {{type: String, target: String}[]} a list of targeted objects
     */
    requestTargets () {
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
            case "talk":
                return new TalkEffect(info);
            case "put":
                return new PutEffect(info["item"], info["area"], info["interactive"]);
            case "require":
                return new RequireEffect(info["require-type"], info["require-target"], info["failure-effects"]);
            default:
                return undefined;
        }
    }
}

Effect.prototype.abstract = true;

class EndEffect extends Effect {
    constructor(ending) {
        super();
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
    constructor(requireTarget, requireType, failureEffects) {
        super();
        this.requireTarget = requireTarget;
        this.requireType = requireType;
        this.failureEffects = [];
        if (failureEffects) {
            failureEffects.forEach((effectInfo) => {
                this.failureEffects.push(Effect.create(effectInfo["type"], effectInfo["targe"]));
            });
        }
    }

    requestTargets () {
        return [{
            "type": this.requireType,
            "target": this.requireTarget
        }];
    }
}

export { Effect }