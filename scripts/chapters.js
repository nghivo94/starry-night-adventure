const chapters = [];

class Chapter {
    constructor(order, title) {
        this.order = order;
        this.title = title;
        this.gameStatus = undefined;
    }

    updateStatus (status) {
        this.gameStatus = status;
        localStorage.setItem("chapters", JSON.stringify(chapters));
    }
}

chapters.push(
    new Chapter(0, "Encounter"), 
    new Chapter(1, "Of Anthem and Flames"), 
    new Chapter(2, "Of Stars and Destiny"), 
    new Chapter(3, "Of Gold and Illusion"), 
    new Chapter(4, "Of Alchemy and Memory"),
    new Chapter(5, "Of Flowers and Virtue"),
    new Chapter(6, "Of Kings and Pawns"));

export {chapters};