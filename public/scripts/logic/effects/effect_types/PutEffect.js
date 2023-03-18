import { Effect } from "../Effect.js";

export class PutEffect extends Effect {
    constructor(item, area, interactive) {
        super();
        this.item = item;
        this.locationType = undefined;
        this.location = undefined
        if (area) {
            this.locationType = 0;
            this.location = area;
        }
        else {
            this.locationType = 1;
            this.location = interactive;
        }
    }

    requestTargets () {
        const result = [];
        result.push({
            "type": "item",
            "target": this.item
        });
        if (this.locationType === 0) {
            result.push({
                "type": "area",
                "target": this.location
            });
        }
        else {
            result.push({
                "type": "interactive",
                "target": this.location
            });
        }
        return result;
    }
}