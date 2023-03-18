import { BackEffect } from "./effect_types/BackEffect.js";
import { DialogEffect } from "./effect_types/DialogEffect.js";
import { EndEffect } from "./effect_types/EndEffect.js";
import { PutEffect } from "./effect_types/PutEffect.js";
import { RequireEffect } from "./effect_types/RequireEffect.js";
import { TalkEffect } from "./effect_types/TalkEffect.js";

export class EffectFactory {
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
            case "back":
                return new BackEffect();
            case "require":
                return new RequireEffect(info["require-type"], info["require-target"], info["modifier"], info["failure-lines"] ,info["failure-effects"]);
            default:
                return undefined;
        }
    }
}