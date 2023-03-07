import { chapter_data }  from "../data/chapter_data.js"
import { character_data } from "../data/character_data.js"
import { area_data } from "../data/area_data.js"
import { Chapter } from "./chapters.js"
import { Effect } from "./effects.js"
import { Character, DialogOption, Dialog} from "./characters.js"
import { Area } from "./areas.js"

class DataHandler {
    static initData () {
        const reader = new Reader();
        const local = new LocalReader();
        const chapters = reader.readChapter(chapter_data);
        const characters = reader.readCharacter(character_data);
        const areas = reader.readArea(area_data);
        //local.updateChapter(chapters);
        return {
            "chapters": chapters,
            "characters": characters,
            "areas": areas
        }
    }

    static saveData (saveInfo) {
        saveInfo.forEach((pair) => {
            localStorage.setItem(pair["key"], pair["value"]);
        });
    }
}

class Reader {
    /**
     * 
     * @param {Array<Object>} chapter_data 
     * @returns {Array<Chapter>} array of all chapters in chapter_data
     */
    readChapter (chapter_data) {
        return chapter_data.map((data) => {
            return new Chapter(data["order"], data["title"], data["description"]);
        });
    }

    /**
     * 
     * @param {Array<Object>} character_data 
     * @returns {{name: Character}} map of each name to its corresponding character
     */
    readCharacter (character_data) {
        const characters = {}
        for (let characterIndex = 0; characterIndex < character_data.length; characterIndex ++ ) {
            const name = character_data[characterIndex]["name"];
            const dialogs = [];
            const dialog_data = character_data[characterIndex]["dialogs"];
            for (let dialogIndex = 0; dialogIndex < dialog_data.length; dialogIndex ++ ) {
                const view = dialog_data[dialogIndex]["view"];
                const options = {};
                const option_data = dialog_data[dialogIndex]["options"];
                Object.keys(option_data).forEach((key) => {
                    options[key] = new DialogOption(
                        option_data[key]["effects"].map((data)=>{return Effect.create(data["type"], data["info"]);}),
                        option_data[key]["lines"]);
                });
                const choices = dialog_data[dialogIndex]["choices"];
                dialogs.push(new Dialog(view, options, choices));
            }
            const appearances = character_data[characterIndex]["appearances"];
            characters[name] = new Character(name, dialogs, appearances);
        }
        return characters;
    }

    /**
     * 
     * @param {Array<Object>} area_data 
     * @returns {{id: Area}} map of each id to its corresponding area
     */
    readArea (area_data) {
        const areas = {};
        const areaList = area_data.map((data) => {
            return new Area (data["id"], data["name"], data["views"], data["interactives"], data["character"]);
        });
        for (let index = 0; index < areaList.length; index ++ ) {
            areas[areaList[index].id] = areaList[index];
        }
        return areas
    }
}

class LocalReader {
    updateChapter (chapters) {
        const chapterStatus = JSON.parse(localStorage.getItem("chapters"));
        if (chapterStatus) {
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
}

export { DataHandler }