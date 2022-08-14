const items = [];

class Item {
    constructor (id, name, origin, description, view, lore) {
        this.id = id;
        this.name = name;
        this.origin = origin;
        this.description = description;
        this.view = view;
        this.lore = lore;
        this.status = 0;
    }

    updateStatus (status) {
        this.status = status;
        localStorage.setItem("items", JSON.stringify(items));
    }
}
