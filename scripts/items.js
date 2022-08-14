const items = {};

class Item {
    
    constructor (name, origin, description, view, lore) {
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

    static create(name, origin, description, view, lore) {
        items[name.toLowerCase()] = new Item(name, origin, description, view, lore);
    }
}

export { items }