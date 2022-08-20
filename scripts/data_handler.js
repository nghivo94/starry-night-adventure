import {chapter_data}  from "../data/chapter_data.js"
import { Chapter } from "./chapters.js"
import { Effect } from "./effects.js"
import { Character, DialogOption, Dialog} from "./characters.js"
import { character_data } from "../data/character_data.js"

class DataHandler {
    static initData () {
        const reader = new WorldReader()
        return {
            "chapters": reader.readChapter(chapter_data),
            "characters": reader.readCharacter(character_data)
        }
    }
}

class WorldReader {
    readChapter (chapter_data) {
        return chapter_data.map((data) => {
            return new Chapter(data["order"], data["title"], data["description"]);
        });
    }
    readCharacter (character_data) {
        const result = {}
        for (let characterIndex = 0; characterIndex < character_data.length; characterIndex ++ ) {
            const name = character_data[characterIndex]["name"];
            const dialogs = [];
            const dialog_data = character_data[characterIndex]["dialogs"];
            for (let dialogIndex = 0; dialogIndex < dialog_data.length; dialogIndex ++ ) {
                const view = dialog_data[dialogIndex]["view"];
                const options = {};
                const option_data = dialog_data[dialogIndex]["options"];
                Object.keys(option_data).forEach((key) => {
                    options[key] = new DialogOption(option_data[key]["target"],
                        option_data[key]["effects"].map((data)=>{return new Effect(data["type"], data["target"]);}),
                        option_data[key]["line"]);
                });
                const choices = dialog_data[dialogIndex]["choices"];
                dialogs.push(new Dialog(view, options, choices));
            }
            const appearances = character_data[characterIndex]["appearances"];
            result[name] = new Character(name, dialogs, appearances);
        }
        return result;
    }
}

export {DataHandler}