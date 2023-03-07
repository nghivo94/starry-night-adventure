import { Chapter } from "./chapters.js";
import { Item } from "./items.js";
import { Effect } from "./effects.js";
import { Player } from "./player.js";
import { Character } from "./characters.js";
import { Area } from "./areas.js";
import { DataHandler } from "./data_handler.js";

class World {
    constructor () {
        this.player = new Player(0, "C", []);
        this.ended = false;
        this.resource = DataHandler.initData();
        console.log(this.resource);
    }

    init() {
        this.player.talk("");
        const talkResult = this.resource["characters"][this.player.getTarget()].getDialog();
        const currentChapter = this.resource["chapters"][0];
        currentChapter.start();
        this._saveData(["chapter"]);
        return {
            "chapter": currentChapter.getFunctionInfo(),
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
            const effects = choiceResult["effects"]
            const effectResult = this._handleEffect(effects, '');
            this._saveData(effectResult["change"]);
            if (!this.player.isTalking()) {
                this._saveData(["area"]);
            }
            /**@type {String} */
            if (effectResult["lines"]) {
                return {
                    "lines": effectResult["lines"]
                };
            }
            return this._extractFullChange(choiceResult.lines);
        }
        return {
            "lines": {
                "tag": 'p',
                "text": `You are not in a conversation.`
            }
        };
    }

    /**
     * Handle a list of effects by extracting requested resources, performing effects and updating changes or failure lines
     * @param {Array<Effect>} effects a list of given effects
     * @param {{change: Array<String>, lines: Array<Object>}} previousResult an object containing "change" array and "lines" (failure lines)
     * @returns {{change: Array<String>, lines: Array<Object>}} result containing "change" array and "lines" (failure lines)
     * @recursive
     */

    _handleEffect (effects, previousResult) {
        let result = {"change": []};                     //Initiate the result object with "change" array
        if (previousResult) { result = previousResult; } //If a previous result was given, pass the previous result
        if (effects.length == 0) { return result; }      //If no previous effect (failure effect) was given, return result
        for (let i = 0; i<effects.length; i++) {
            const effect = effects[i];                      //Get the current effect
            const targets = effect.requestTargets();        //Get the targets of the current effect
            const resources = targets.map((info) => this._extractResource(info["type"], info["target"]));  //Get the targets from world resource
            const effectResult = effect.performEffect(resources); //Perform the effect
            if (!effectResult) { //If effect require fails,
                if (effect.failureLines) { //If effect require has failure lines, update failure lines
                    result["lines"] = effect.failureLines;
                }
                return this._handleEffect(effect.failureEffects, result); //Recursively call _handleEffect for the failure effects and pass on the result
            }
            //Remaining lines would not be executed if the effect require fails
            //Update change for each type of requested targets
            targets.forEach((target) => {
                result["change"].push(target["type"]);
            }); 
        }
        return result; //Return result
    }

    /**
     * Extract requested resource from world "resource" object
     * @param {String} type indication for type of requested resource
     * @param {String} target name/id/title/... indication of requested target
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

    _extractFullChange (lines) {
        if (this.player.isDefault()) {
            const areaInfo = this.resource["areas"]["" + this.player.room + this.player.area].getFunctionInfo();
            return {
                "viewTitle": areaInfo["name"],
                "view": areaInfo["view"],
                "lines": lines
            };
        }
        else if (this.player.isInspecting()) {

        }
        else if (this.player.isInteracting()) {

        }
        else {
            const talkResult = this.resource["characters"][this.player.getTarget()].getDialog();
            return {
                "viewTitle": this.player.getTarget(),
                "view": talkResult.view,
                "choices": talkResult.choices,
                "lines": lines
            };
        }
    }

    /**
     * 
     * @param {Array<String>} change 
     * @returns {Array<{key: String, value: String}>}
     */
    _saveData (change) {
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
        DataHandler.saveData(result);
    }
    
}
const world = new World();

export { world, World }