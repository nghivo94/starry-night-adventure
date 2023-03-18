import { Effect } from "../Effect.js";
import { Character } from "../../game_objects/Character.js";

export class DialogEffect extends Effect {
    constructor(character, targetStage) {
        super();
        this.character = character;
        this.targetStage = targetStage;
    }

    request_targets () {
        return [
            {
                "type": "character",
                "target": this.character
            }
        ]
    }

    perform_effect (targets) {
        /**@type {Character} */
        const character = targets[0];
        character.setStatus(this.targetStage);
        return true;
    }
}