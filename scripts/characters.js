const characters = {};

class DialogOption {
    constructor (key, target, effects) {
        this.key = key;
        this.target = target;
        this.effects = effects;
        Object.freeze(this);
    }
}

class Phase {
    constructor (dialog, appearance, options) {
        this.dialog = dialog;
        this.appearance = appearance;
        this.options = options;
        Object.freeze(this);
    }    
}

class Character {
    constructor (name, phases) {
        this.name = name;
        this.phases = phases;
        this.status = 0;
    }

    static create (name, phases) {
        characters[name.toLowerCase()] = new Character(name, phases);
    }

    getDialog () {
        return phases[this.status].dialog;
    }

    reactUser (input) {

    }
}

Character.create ("Shopkeeper", [
    new Phase (``)
])