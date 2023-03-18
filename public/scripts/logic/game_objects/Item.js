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
}

export { Item }