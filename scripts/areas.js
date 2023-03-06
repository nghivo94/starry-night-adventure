//Class Area
class Area {
    constructor(id, name, views, interactives, character) {
        this.id = id;                     //Area ID is based on room and location from center area
        this.name = name;              
        this.views = views;               //Array of possible views
        this.interactives = interactives; //Array IDs of interactives
        this.character = character;       //Name of character
        Object.freeze(this.interactives); //Make interactives list immutable
        Object.freeze(this.views); //Make views list immutable

        //Variable status, getter and setter
        let status = {
            "state": 0,             //State of the Area, choosing the view to be displayed
            "reached": 0,        
        };
        this.getStatus = () => {return {...status};}
        this.setState = (newState) => {status["state"] = newState;}
        this.reached = () => {status["reached"] = 1;}

        //Variable items (item names) list, setters and getter based on name
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
        this.getItems = () => {return [...items];} //Return cloned list of item names

        Object.freeze(this); //Make the Area immutable
    }

    getFunctionInfo () { //Return all information required for game progression
        return {
            "room": this.id.charAt(0),
            "name": this.name,
            "view": this.views[this.getStatus()["state"]],
            "interactives": this.interactives,
            "items": this._getItems(),
            "character": this.character,
        }
    }

    getSaving () { //Return all information to be saved
        return {
            "state" : this.getStatus()["state"],
            "reached" : this.getStatus()["reached"]
        }
    }

    static getSaving (areas) {
        const areaSaving = {};
        areas.forEach((area) => {
            areaSaving[area.id] = area.getSaving();
        });
    }
}

export { Area }