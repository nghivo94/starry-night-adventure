export class Effect {
    constructor (type, target) {
        this.type = type;
        this.target = target;
        Object.freeze(this);
    }
}