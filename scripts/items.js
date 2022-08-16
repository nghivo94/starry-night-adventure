//Initialization: an object to store all items, with item name being object key.
const items = {};

//Return the status of the item list for storage.
function getStatus () {
    const itemStatus = {};
    Object.keys(items).forEach((key) => {
        itemStatus[key] = items[key].getStatus();
    });
    return itemStatus;
}

//Class Item
class Item {
    constructor (name, origin, description, view, lore) {
        //Fixed attributes
        this.name = name;
        this.origin = origin;
        this.description = description;
        this.view = view;
        this.lore = lore;

        //Status of item, setters and getter
        let status = {
            seen: 0,
            inspected: 0,
            uncovered: 0
        };
        this.seen = () => {status.seen = 1;}
        this.inspected = () => {status.inspected = 1;}
        this.uncovered = () => {status.uncovered = 1;}
        this.getStatus = () => {return {...status};}

        //Make object (fixed attributes) immutable
        Object.freeze(this)
    }

    //Get information for archive display based on status
    getArchiveInfo () {
        const status = this.getStatus();
        if (status.seen === 0) {
            return undefined; //If unseen, return undefined.
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

    //Get all items from a list, with names and descriptions
    static getItems (itemList) {
        const result = {};
        itemList.forEach( (itemName) => {
            const item = items[itemName.toLowerCase()];
            result[item.name] = item.description;
            item.seen();
        });
        return {
            items: result,
            itemStatus: getStatus()
        };
    }

    //Get item view of a chosen item, returns item name, view and itemStatus
    static getItemView (item) {
        const item = items[item.toLowerCase()];
        item.inspected();
        const result = {
            name: item.name,
            view: item.view
        };
        return {
            item: result,
            itemStatus: getStatus()
        };
    }

    //Get lore of a chosen item, returns item name, view and itemStatus
    static getItemLore (item) {
        const item = items[item.toLowerCase()];
        item.uncovered();
        const result = {
            name: item.name,
            lore: item.lore
        };
        return {
            item: result,
            itemStatus: getStatus()
        };
    }

    //Convenient way to create item and automatically add to items list.
    static create (name, origin, description, view, lore) {
        items[name.toLowerCase()] = new Item(name, origin, description, view, lore);
    }
}



//Fix the items list after adding all items
Object.freeze(items);
export { Item }