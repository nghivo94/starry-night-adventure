import { Effect } from "../Effect.js";

export class EndEffect extends Effect {
    constructor(ending) {
        super();
        this.ending = ending;
    }

    request_targets () {
        return [
            {
                "type": "ending",
                "target": this.ending
            }
        ];
    }

    /**
     * @param {Array<Ending>} targets the list containing 1 ending element
     */
    perform_effect (targets) {
        const ending = targets[0];
        ending.reach();
        return true;
    }
}