//Class Effect
class Effect {
    constructor (type, target) {
        this.target = target;
        this.type = type;
        Object.freeze(this.target)  //Make the target immutable
        Object.freeze(this);        //Make the object immutable
    }

    //Creation using factory method
    static create (type, target) {
        switch (type) {
            case "end":
                return new EndEffect(type, target);
            case "talk":
                return new TalkEffect(type, target);
            case "put":
                return new PutEffect(type, target);
            default:
                return undefined;
        }
    }
}

class EndEffect extends Effect {
    getEnding () {return this.target;}
}

class TalkEffect extends Effect {
    getCharacter () {return this.target;}
}

class PutEffect extends Effect {
    getItem () {return this.target.item;}
    getArea () {return this.target.area;}
    getInteractive () {return this.target.interactive;}
}

export { Effect }