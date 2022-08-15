const items = {};

class Item {
    
    constructor (name, origin, description, view, lore) {

        this.name = name;
        this.origin = origin;
        this.description = description;
        this.view = view;
        this.lore = lore;

        let status = {
            seen: 0,
            inspected: 0,
            uncovered: 0
        };

        this.seen = () => {status.seen = 1;}
        this.inspected = () => {status.inspected = 1;}
        this.uncovered = () => {status.uncovered = 1;}
        this.getStatus = () => {return status;}

        Object.freeze(this)
    }

    getArchiveInfo () {
        const status = this.getStatus();
        if (status.seen === 0) {
            return {};
        }
        else {
            const result = {
                name: this.name,
                origin: this.origin,
                description: this.description
            }
            if (status.inspected === 1) {
                result.details = this.view;
            }
            if (status.uncovered === 1) {
                result.lore = this.lore;
            }
            return result;
        }
    }

    static getItems (itemList) {
        const result = {};
        itemList.forEach( (itemName) => {
            const item = items[itemName.toLowerCase()];
            result[item.name] = item.description;
            item.seen();
        });
        Item.updateStatus();
        return result;
    }

    static getItemView (item) {
        const item = items[item.toLowerCase()];
        item.inspected();
        const result = {
            name: item.name,
            view: item.view
        };
        Item.updateStatus();
        return result;
    }

    static getItemLore (item) {
        const item = items[item.toLowerCase()];
        item.uncovered();
        const result = {
            name: item.name,
            lore: item.lore
        };
        Item.updateStatus();
        return result;
    }

    static updateStatus () {
        const itemStatus = {};
        Object.keys(items).forEach((key) => {
            itemStatus[key] = items[key].getStatus();
        });
        console.log(itemStatus);
    }

    static create (name, origin, description, view, lore) {
        items[name.toLowerCase()] = new Item(name, origin, description, view, lore);
    }
}

Object.freeze(items);
export { Item }