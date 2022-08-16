import { Chapter } from "./chapters.js";
import { Item } from "./items.js";
import { Effect } from "./effects.js";
import { Player } from "./player.js";
import { Character } from "./characters.js";
import { Area } from "./areas.js";

class World {
    constructor () {
        this.player = new Player(0, "C", []);
    }
    takeItem (itemName) {
        if (this.player.isDefault()) {
            const areaID = this.player.room + this.player.area;

        }
    }

    init() {
        this.player.talk("");
        const talkResult = Character.talk(this.player.getTarget());
        return {
            chapter: Chapter.startChapter(),
            viewTitle: talkResult.name,
            view: talkResult.dialog,
            line: `
                <p>On one starry night, emerge souls of the past whose stories should have been buried...</p>
                <p>Welcome to Starry Night Adventure game. You can start by using the command 'help' for more information.</p>
                <p>This is a lore-based, difficult and long text game. It also contains some horror and violent elements. Please consider carefully before playing.</p>
            `
        }
    }
}

class WorldStatus {

}

const world = new World();
export { world }