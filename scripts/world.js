import { Chapter } from "./chapters.js";
import { Item } from "./items.js";
import { Effect } from "./effects.js";
import { Player } from "./player.js";
import { Character } from "./characters.js";
import { Area } from "./areas.js";

class World {
    constructor () {
        this.player = new Player(0, "C", []);
        this.player.talk("");
    }
    takeItem (itemName) {
        if (this.player.isDefault()) {
            const areaID = this.player.room + this.player.area;

        }
    }
    getView () {
        if (this.player.isDefault()) {
            const area = Area.getArea(this.player.room + this.player.area);
            return {
                viewTitle: area.name,
                view: area.view,
                interactives: area.interactives,
                items: area.items
            }
        }
        else if (this.player.isTalking()) {
            const talkResult = Character.talk(this.player.getTarget());
            return {
                viewTitle: talkResult.name,
                view: talkResult.dialog
            }
        }
        else if (this.player.isInspecting()) {
            const item = Item.getItemView(this.player.getTarget());
            return {
                viewTitle: item.name,
                view: item.view
            }
        }
        else {

        }
    }
}

class WorldStatus {

}

const world = new World();
export { world }