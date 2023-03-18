import { Effect } from "../Effect.js";
import { Character } from "../../game_objects/Character.js";

export class DialogEffect extends Effect {
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