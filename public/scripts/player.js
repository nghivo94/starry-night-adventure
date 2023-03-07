const STATUS_NONE = 0;
const STATUS_INTERACTING = 1;
const STATUS_INSPECTING = 2;
const STATUS_TALKING = 3;

class Player {
    constructor (room, area, inventory) {
        this.room = room;
        this.area = area;
        this.inventory = inventory

        let status = STATUS_NONE;
        let target = undefined;

        this.talk = (newTarget) => {
            status = STATUS_TALKING;
            target = newTarget;
        }

        this.interact = (newTarget) => {
            status = STATUS_INTERACTING;
            target = newTarget;
        }

        this.inspect = (newTarget) => {
            status = STATUS_INSPECTING;
            target = newTarget;
        }

        this.back = () => {
            status = STATUS_NONE;
            target = undefined;
        }

        this.isInspecting  = () => {return status === STATUS_INTERACTING;}
        this.isInteracting = () => {return status === STATUS_INTERACTING;}
        this.isTalking = () => {return status === STATUS_TALKING}
        this.isDefault = () => {return status === STATUS_NONE;}
        this.getTarget = () => {return target;}
    }
}

export { Player }