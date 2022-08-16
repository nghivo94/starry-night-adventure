import { Effect } from "./effects.js"

//Initialization: an array to store all characters
const characters = {};

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
    constructor (view, options) {
        this.view = view;               //View structure of this dialog
        this.options = options;         //Possible dialog options
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
        return this.appearances[this.getStatus()];
    }

    //Get dialog view based on current state
    getDialog () {
        return this.dialogs[this.getStatus()].view;
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

    //Creation method to easily create and add character to characters list
    static create (name, dialogs, appearances) {
        characters[name.toLowerCase()] = new Character(name, dialogs, appearances);
    }

    //Get a name and appearance of a character based on name.
    static getCharacter (character) {
        const currentCharacter = characters[character.toLowerCase()];
        return {
            name: currentCharacter.name,
            appearance: currentCharacter.getAppearance()
        }
    }

    //Talk to a character based on name, return name and dialog view
    static talk (character) {
        const currentCharacter = characters[character.toLowerCase()];
        return {
            name: currentCharacter.name,
            dialog: currentCharacter.getDialog()
        }
    }

    //Make a character react to a user input, based on name, return the result of that reaction
    static reactInput (character, input) {
        const currentCharacter = characters[character.toLowerCase()];
        return currentCharacter.reactInput(input);
    }
}

Character.create ("", [
    new Dialog(
        `
        <p class="img-detail">Orion constellation - The Hunter</p>
        <img class="center-portrait-img" src="https://drive.google.com/uc?export=view&id=16cDtMtYwnimZuefOkPG6su5DaAmCGUVd">
        <p class="story-telling">"This is Orion constellation, named after a hunter in Greek Mythology. 
            Legend has it that Orion was a supernaturally powerful hunter, born to the God of Seas Poseidon. 
            Yet as he enraged Gaea, Mother of Earch, she sent a scorpio to dispatch him. 
            This is how the ancient Greek explained why Opion and Scorpius constellations never appear at the same time."</p>
        <p>"Oh, seems like life in the sky is not as easy either."</p>
        <p>Someone in the crowd commented at the descriptions of the museum guide, followed by frequent chatters and giggles.</p>
        <div class="block text-center">
            <p class="status-description">You are on a museum trip, in the astrology section.</p>
            <p class="status-description">Little did you know, you were signing up for something much more.</p>
        </div>
        <p>As you are roaming around paintings of constellations, a tall man bumps into you. 
            His face is entirely covered with a hood, sunglasses and a mask. 
            He quickly mumbles an apology and disappear amidst the stream of people towards the exit.</p>
        <div class="float-right-container">
            <p>
                Yet you notice something the man left behind, right beneath your feet.
                It is a chess piece. An exquisite one to be precise. 
                It is made of marble, glistening in the light. 
                The workmanship is immaculate, shaping the black surface into a beautiful pawn piece.
            </p>
            <img class="float-right-img" src="https://drive.google.com/uc?export=view&id=1uG4H6P9WH-Blj6iL87NKYr8sBcpdDDTh">
        </div>
        <p>Choices:</p>
        <p class="note">Note: for first time players, it is recommended to choose the first option.</p>
        <label><input type="radio" name="dialog-option">Pick up the chess piece</label>
        <label><input type="radio" name="dialog-option">Leave the chess piece</label>
        <button id="choose">Choose</button>
        `, 
        {
            "1": new DialogOption(0, [Effect.create("end", "nonstart-end")], "You ignored the dropped object and proceeded as usual."),
            "2": new DialogOption(1, [Effect.create("talk", "shopkeeper")], "You picked up the strange object.")
        }
    )
]
);

//Make the characters list immutable after creation of characters
Object.freeze(characters);

export { Character }