import { Effect } from "../Effect.js";

export class EndEffect extends Effect {
    constructor(ending) {
        super();
        this.ending = ending;
    }

    requestTargets () {
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
    performEffect (targets) {
        const ending = targets[0];
        ending.reach();
        return true;
    }
}