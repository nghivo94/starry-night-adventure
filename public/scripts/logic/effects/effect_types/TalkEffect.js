import { Effect } from "../Effect.js";
import { Player } from "../../player.js";
import { Character } from "../../game_objects/Character.js";

export class TalkEffect extends Effect {
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