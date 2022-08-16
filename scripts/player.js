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

        this.talk = (target) => {
            status = STATUS_TALKING;
            target = target;
        }

        this.interact = (target) => {
            status = STATUS_INTERACTING;
            target = target;
        }

        this.inspect = (target) => {
            status = STATUS_INSPECTING;
            target = target;
        }

        this.back = () => {
            status = STATUS_NONE;
            target = undefined;
        }

        this.isInspecting  = () => {status === STATUS_INTERACTING;}
        this.isInteracting = () => {status === STATUS_INTERACTING;}
        this.isTalking = () => {status === STATUS_TALKING;}
    }
}

export { Player }