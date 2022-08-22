import { Chapter } from "./chapters.js";
import { Item } from "./items.js";
import { Effect } from "./effects.js";
import { Player } from "./player.js";
import { Character } from "./characters.js";
import { areas } from "./areas.js";
import { DataHandler } from "./data_handler.js";

function areaInfo (room, location) {
    const area = areas[room + location];
    const result = {
        viewTitle: area.name,
        view: area.view
    }
    if (area.items.length !== 0) {
        const itemListResult = Item.getItems(area.items);
        result.items = itemListResult.items;
        console.log(itemStatus);
    }
    if (area.interactives.length !== 0) {}
    return result;
}

class World {
    constructor () {
        this.player = new Player(0, "C", []);
        this.ended = false;
        this.resource = DataHandler.initData();
    }

    init() {
        this.player.talk("");
        const talkResult = this.resource["characters"][this.player.getTarget()].getDialog();
        const currentChapter = this.resource["chapters"][0];
        currentChapter.start();
        return {
            "chapter": currentChapter.getInfo(),
            "viewTitle": this.player.getTarget(),
            "view": talkResult.view,
            "choices": talkResult.choices,
            "line": `
                <p>On one starry night, emerge souls of the past whose stories should have been buried...</p>
                <p>Welcome to Starry Night Adventure game. You can start by using the command 'help' for more information.</p>
                <p>On one starry night, emerge souls of the past whose stories should have been buried...</p>
                <p>Welcome to Starry Night Adventure game. You can start by using the command 'help' for more information.</p>
                <p>On one starry night, emerge souls of the past whose stories should have been buried...</p>
                <p>Welcome to Starry Night Adventure game. You can start by using the command 'help' for more information.</p>
                <p>On one starry night, emerge souls of the past whose stories should have been buried...</p>
                <p>Welcome to Starry Night Adventure game. You can start by using the command 'help' for more information.</p>
            `,
            "save": [
                {
                    "key": "chapters",
                    "value": Chapter.getStatus(this.resource["chapters"])
                }
            ]
        }
    }

    back () {
        if (this.player.isDefault()) {
            return {
                line: "You are not interacting or inspecting"
            }
        }
        if (this.player.isTalking()) {
            return {
                line: "You cannot use 'back' in a conversation."
            }
        }
        this.player.back();
        return areaInfo(this.player.room, this.player.area);
    }

    choose (modifier) {
        if (this.player.isTalking()) {
            
        }
        return {
            line: "You are not in a conversation."
        }
    }


    handleEffect (effect) {
        switch (effect.type) {
            case "end":
                world.ended = true;
                break
            case "":
            default:

        }
    }
}

class WorldStatus {

}

const world = new World();

function inputHandler (verb, modifier) {
    if (world.ended) {
        return undefined;
    }
    switch (verb) {
        
    }
}
export { world }