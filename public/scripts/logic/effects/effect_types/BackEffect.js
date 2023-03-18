import { Effect } from "../Effect.js";
import { Player } from "../../player.js";

export class BackEffect extends Effect {
    constructor () {
        super();
    }

    requestTargets () {
        return [
            {
                "type": "player",
                "target": "player"
            }
        ]
    }

    performEffect (targets) {
        const player = targets[0];
        player.back();
        return true;
    }
}