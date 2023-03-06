//Class Area
class Area {
    constructor(id, name, views, interactives, character) {
        this.id = id;                     //Area ID is based on room and location from center area
        this.name = name;              
        this.views = views;               //Array of possible views
        this.interactives = interactives; //Array IDs of interactives
        this.character = character;
        Object.freeze(this.interactives); //Make interactives list immutable
        Object.freeze(this.views); //Make views list immutable

        //Variable status, getter and setter
        let status = 0;
        this.getStatus = () => {return status;}
        this.setStatus = (newStatus) => {status = newStatus;}

        //Variable items list, setters and getter based on name
        let items = [];
        this.addItem = (itemName) => {items.push(itemName.toLowerCase());} //Adding an item
        this.removeItem = (itemName) => {       //Removing an item by filtering
            
            //Appropriate removal: item name in items list
            if (items.includes(itemName.toLowerCase())) {
                items = items.filter((item) => {
                    return item !== itemName;
                });
                return itemName;
            }
            return undefined; //Item name not in items list, return undefined
        }
        this._getItems = () => {return [...items];} //Return cloned list of item

        Object.freeze(this); //Make the Area immutable
    }

    getInfo () { //Return all information
        return {
            "room": this.id.charAt(0),
            "name": this.name,
            "view": this.views[this.getStatus()],
            "interactives": this.interactives,
            "items": this._getItems(),
            "character": this.character,
        }
    }
}

export { Area }