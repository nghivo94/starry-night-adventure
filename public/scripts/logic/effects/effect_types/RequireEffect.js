import { Effect } from "../Effect.js";
import { Chapter } from "../../chapters.js";

export class RequireEffect extends Effect {
    constructor(requireTarget, requireType, modifier, failureLines, failureEffects) {
        super();
        this.requireTarget = requireTarget;
        this.requireType = requireType;
        this.modifier = modifier;
        this.failureLines = failureLines;
        this.failureEffects = failureEffects
    }

    request_targets () {
        let targets = [];
        this.failureEffects.forEach(effect => {
            targets = targets.concat(effect.request_targets);
        });
        targets.push({
            "type": this.requireType,
            "target": this.requireTarget,
            "modifier": this.modifier
        })
        return targets;
    }

    perform_effect (targets) {
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