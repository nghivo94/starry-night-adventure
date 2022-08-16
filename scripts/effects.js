//Initialization: a fixed array for all possible effect types (for management)
const EFFECT_TYPES = ["end", "talk", ""];
Object.freeze(EFFECT_TYPES);

//Class Effect
class Effect {
    constructor (type, target) {
        this.type = type;
        this.target = target;
        Object.freeze(this); //Make the object immutable
    }

    //Creation method to also check type
    static create (type, target) {
        if (EFFECT_TYPES.includes(type)) {
            return new Effect(type, target);
        }
        else return undefined;
    }
}

export { Effect }