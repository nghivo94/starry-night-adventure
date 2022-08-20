//Class DialogOption represents possible choices and effects of those choices in a dialog
class DialogOption {
    constructor (target, effects, line) {
        this.target = target;           //The next state of the character if the choice is chosen
        this.effects = effects;         //The effects of the choice
        Object.freeze(this.effects);    //Make effects immutable after creation
        this.line = line;               //A resulting line if this choice is chosen
        Object.freeze(this);            //Make the option immutable
    }
}

//Class Dialog represents a dialog of the character in one state
class Dialog {
    constructor (view, options, choices) {
        this.view = view;               //View structure of this dialog
        this.options = options;         //Possible dialog options
        this.choices = choices;         //Visibel choices
        Object.freeze(this.options);    //Make options immutable after creation
        Object.freeze(this);            //Make the dialog immutable
    }    
}

//Class Character
class Character {
    constructor (name, dialogs, appearances) {
        this.name = name;
        this.dialogs = dialogs;         //Array of Dialog, index corresponds with character status
        this.appearances = appearances; //Array of appearances (character description in view), index corresponds with character status
        Object.freeze(this.dialogs)     //Make dialogs immutable after creation
        Object.freeze(this.appearances) //Make appearances immutable after creation
        
        //Current character state, getter and setter
        let status = 0;
        this.getStatus = () => {return status;}
        this.setStatus = (newStatus) => {status = newStatus;}
        Object.freeze(this);            //Make character immutable
    }

    //Get appearance based on current state
    getAppearance () {
        return {
            "character": this.name,
            "appearance": this.appearances[this.getStatus()],
        }
    }

    //Get dialog view based on current state
    getDialog () {
        const dialog = this.dialogs[this.getStatus()];
        return {
            "view": dialog.view,
            "choices": dialog.choices
        }
    }

    //React based on user input, return effects of the choice and return line
    reactInput (input) {
        const currentDialog = this.dialogs[this.getStatus()];

        //Check if the input is in the given options
        if (Object.keys(currentDialog.options).includes(input.toLowerCase())) {
            const chosenOption = options[input.toLowerCase()];
            this.setStatus(chosenOption.target);
            return {
                effects: chosenOption.effects,
                line: chosenOption.line
            }
        }

        //Check if the options contain "@" which answer to all other inputs
        else if (Object.keys(currentDialog.options).includes("@")) {
            const chosenOption = options["@"];
            this.setStatus(chosenOption.target);
            return {
                effects: chosenOption.effects,
                line: chosenOption.line
            }
        }

        //Return undefined otherwise
        else {
            return undefined;
        }
    }
}

export { Character, Dialog, DialogOption }