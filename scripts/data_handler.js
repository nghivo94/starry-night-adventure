import {chapter_data}  from "../data/chapter_data.js"
import { Chapter } from "./chapters.js"
import { Effect } from "./effects.js"
import { Character, DialogOption, Dialog} from "./characters.js"
import { character_data } from "../data/character_data.js"

class DataHandler {
    static initData () {
        const reader = new Reader();
        const local = new LocalReader();
        const chapters = reader.readChapter(chapter_data);
        const characters = reader.readCharacter(character_data) 
        //local.updateChapter(chapters);
        return {
            "chapters": chapters,
            "characters": characters
        }
    }
}

class Reader {
    /**
     * 
     * @param {Object} chapter_data 
     * @returns {Array<Chapter>} array of all chapters in chapter_data
     */
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
                        option_data[key]["effects"].map((data)=>{return Effect.create(data["type"], data["info"]);}),
                        option_data[key]["lines"]);
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

class LocalReader {
    updateChapter (chapters) {
        const chapterStatus = JSON.parse(localStorage.getItem("chapters"));
        for (const [key, value] of Object.entries(chapterStatus)) {
            if (value["started"] == 1) {
                chapters[key].start();
            }
            else if (value["reached"] == 1) {
                chapters[key].reach();
            }
        }
    }
}

export { DataHandler }