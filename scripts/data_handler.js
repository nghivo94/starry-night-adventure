import {chapter_data}  from "../data/chapter_data.js"
import { Chapter } from "./chapters.js"

class DataHandler {
    static initData () {
        const reader = new WorldReader()
        return {
            chapter: reader.readChapter(chapter_data)
        }
    }
}

class WorldReader {
    readChapter (chapter_data) {
        return chapter_data.map((data) => {
            return new Chapter(data.order, data.title, data.description);
        });
    }
}

export {DataHandler}