//Initialization: an array to store areas 
const areas = {};

//Class Area
class Area {
    constructor(id, name, views, interactives, items) {
        this.id = id;                     //Area ID is based on room and location from center area
        this.name = name;              
        this.views = views;               //Array of possible views
        this.interactives = interactives; //Array IDs of interactives
        Object.freeze(this.interactives); //Make interactives list immutable
        Object.freeze(this.views); //Make views list immutable

        //Variable status, getter and setter
        let status = 0;
        this.getStatus = () => {return status;}
        this.setStatus = (newStatus) => {status = newStatus;}

        //Variable items list, setters and getter based on name
        let innerItems = items;
        this.addItem = (itemName) => {innerItems.push(itemName.toLowerCase());} //Adding an item
        this.removeItem = (itemName) => {       //Removing an item by filtering
            
            //Appropriate removal: item name in items list
            if (innerItems.includes(itemName.toLowerCase())) {
                innerItems = innerItems.filter((item) => {
                    return item !== itemName;
                });
                return itemName;
            }
            return undefined; //Item name not in items list, return undefined
        }
        this.getItems = () => {return [...innerItems];} //Return cloned list of item

        Object.freeze(this); //Make the Area immutable
    }

    getView () {return this.views[this.getStatus()]} //Return view based on status

    //Get area information based on area ID, return object containing area information
    static getArea (areaID) {
        const chosenArea = areas[areaID];
        return {
            name: chosenArea.name,
            view: chosenArea.getView(),
            interactives: chosenArea.interactives,
            items: chosenArea.getItems()
        }
    }
    
    //Creation method to create and add to areas list.
    static create (id, name, views, interactives, items) {
        areas[id] = new Area(id, name, views, interactives, items);
    }
}

Object.freeze(areas); //Make areas list immutable

export { Area }