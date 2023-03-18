import { Effect } from "../Effect.js";
import { Chapter } from "../../chapters.js";

export class RequireEffect extends Effect {
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