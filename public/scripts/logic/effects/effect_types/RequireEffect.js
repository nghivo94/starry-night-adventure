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
        return [{
            "type": this.requireType,
            "target": this.requireTarget,
            "modifier": this.modifier
        }];
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