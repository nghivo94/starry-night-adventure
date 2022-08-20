const character_data = [
    {
        "name": "",
        "dialogs": [
            {
            "view": `<p class="img-detail">Orion constellation - The Hunter</p>
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
                        He quickly mumbles an apology and disappears amidst the stream of people towards the exit.</p>
                    <div class="float-right-container">
                        <p>
                            Yet you notice something the man left behind, right beneath your feet.
                            It is a chess piece. An exquisite one to be precise. 
                            It is made of marble, glistening in the light. 
                            The workmanship is immaculate, shaping the black surface into a beautiful pawn piece.
                        </p>
                        <img class="float-right-img" src="https://drive.google.com/uc?export=view&id=1uG4H6P9WH-Blj6iL87NKYr8sBcpdDDTh">
                    </div>`,
            "options": {
                "1": {
                    "target": 1,
                    "effects": [
                        {
                            "type": "talk",
                            "target": ""
                        }
                    ],
                    "line": "You picked up the chess piece."
                },
                "2": {
                    "target": 0,
                    "effects": [
                        {
                            "type": "require",
                            "target": {
                                "require-type": "chapter",
                                "require-target": 6,
                                "require-status": "completed"
                            }
                        },
                        {
                            "type": "end",
                            "target": "non-start end"
                        }
                    ],
                    "line": "You ignored the dropped object and proceeded as usual."
                }
            },
            "choices": ["Pick up the chess piece", "Ignore the chess piece"]
            }
        ],
        "appearances": []
    }
]

Object.freeze(character_data)
export { character_data }