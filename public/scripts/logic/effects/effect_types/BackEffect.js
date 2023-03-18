import { Effect } from "../Effect.js";
import { Player } from "../../player.js";

export class BackEffect extends Effect {
    constructor () {
        super();
    }

    request_targets () {
        return [
            {
                "type": "player",
                "target": "player"
            }
        ]
    }

    perform_effect (targets) {
        const player = targets[0];
        player.back();
        return true;
    }
}