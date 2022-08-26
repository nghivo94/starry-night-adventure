import { Chapter } from "./chapters.js";
import { Item } from "./items.js";
import { Effect } from "./effects.js";
import { Player } from "./player.js";
import { Character } from "./characters.js";
import { areas } from "./areas.js";
import { DataHandler } from "./data_handler.js";

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
            "lines": [
                {
                    "tag": 'p',
                    "text": `On one starry night, emerge souls of the past whose stories should have been buried...`
                },
                {
                    "tag": 'p',
                    "text": `Welcome to Starry Night Adventure game. You can start by using the command 'help' for more information.`
                }
            ],
            "save": [
                {
                    "key": "chapters",
                    "value": JSON.stringify(Chapter.getSaving(this.resource["chapters"]))
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
            /**@type {Character} */
            const character = this.resource["characters"][this.player.getTarget()];
            const choiceResult = character.reactInput(modifier);
            const effectResult = this._handleEffect(choiceResult["effects"]);
            const save = this._extractSaveInfo(effectResult["change"]);
            /**@type {String} */
            if (effectResult["lines"]) {
                return {
                    "lines": effectResult["lines"],
                    "save": save
                };
            }
            if (this.player.isTalking()) {
                const talkResult = this.resource["characters"][this.player.getTarget()].getDialog();
                return {
                    "viewTitle": this.player.getTarget(),
                    "view": talkResult.view,
                    "choices": talkResult.choices,
                    "lines": choiceResult.lines
                };
            }
        }
        return {
            "lines": {
                "tag": 'p',
                "text": `You are not in a conversation.`
            }
        };
    }

    /**
     * 
     * @param {Array<Effect>} effects 
     * @returns {{change: Array<String>, lines: Array<Object>}}
     * @recursive
     */

    _handleEffect (effects, previousResult) {
        let result = {"change": []};
        if (previousResult) { result = previousResult; }
        if (effects.length == 0) { return result; }
        for (let i = 0; i<effects.length; i++) {
            const effect = effects[i];                      //Get the current effect
            const targets = effect.requestTargets();        //Get the targets of the current effect
            const resources = targets.map((info) => this._extractResource(info["type"], info["target"]));  //Get the targets from world resource
            const effectResult = effect.performEffect(resources); //Perform the effect
            if (!effectResult) { //If effect require fails,
                if (effect.failureLines) {
                    result["lines"] = effect.failureLines;
                }
                return this._handleEffect(effect.failureEffects, result);
            }
            targets.forEach((target) => {
                result["change"].push(target["type"]);
            });
        }
        return result;
    }

    /**
     * 
     * @param {String} type 
     * @param {String} target 
     * @returns {Object} the requested resource.
     */
    _extractResource (type, target) {
        switch (type) {
            case "player":
                return this.player;
            case "chapter":
                return this.resource["chapters"][target];
            case "character":
                return this.resource["characters"][target];
            default:
                return undefined;
        }
    }

    /**
     * 
     * @param {Array<String>} change 
     * @returns {Array<{key: String, value: String}>}
     */
    _extractSaveInfo (change) {
        const result = [];
        change.forEach((type) => {
            switch (type) {
                case "chapter":
                    result.push({
                        "key": "chapters",
                        "value": JSON.stringify(Chapter.getSaving(this.resource["chapters"]))
                    });
                    break;
                case "character":
                    result.push({
                        "key": "characters",
                        "value": JSON.stringify(Character.getSaving(this.resource["characters"]))
                    });
                    break;
                case "player":
                    result.push({
                        "key": "player",
                        "value": JSON.stringify(this.player)
                    });
                    break;
                default:
                    break;
            }
        });
        return result;
    }
}
const world = new World();

export { world, World }