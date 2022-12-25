const character_data = [
    {
        "name": "",
        "dialogs": [
            {
                "view": [
                    {
                        "tag": 'p',
                        "class": 'img-detail',
                        "text": `Orion constellation - The Hunter`
                    },
                    {
                        "tag": 'img',
                        "class": 'center-portrait-img',
                        "src": "https://drive.google.com/uc?export=view&id=16cDtMtYwnimZuefOkPG6su5DaAmCGUVd",
                    },
                    {
                        "tag": 'p',
                        "class": 'story-telling',
                        "text": `"This is Orion constellation, named after a hunter in Greek Mythology. 
                        Legend has it that Orion was a supernaturally powerful hunter, born to the God of Seas Poseidon. 
                        Yet as he enraged Gaea, Mother of Earch, she sent a scorpio to dispatch him. 
                        This is how the ancient Greek explained why Opion and Scorpius constellations never appear at the same time."`
                    },
                    {
                        "tag": 'p',
                        "text": `"Oh, seems like life in the sky is not as easy either."`
                    },
                    {
                        "tag": 'p',
                        "text": `Someone in the crowd commented at the descriptions of the museum guide, followed by frequent chatters and giggles.`
                    },
                    {
                        "tag": 'div',
                        "class": 'block text-center',
                        "children": [
                            {
                                "tag": 'p',
                                "class": 'status-description',
                                "text": `You are on a museum trip, in the astrology section.`
                            },
                            {
                                "tag": 'p',
                                "class": 'status-description',
                                "text": `Little did you know, you were signing up for something much more.`
                            }
                        ]
                    },
                    {
                        "tag": 'p',
                        "text": `As you are roaming around paintings of constellations, a tall man bumps into you. 
                            His face is entirely covered with a hood, sunglasses and a mask. 
                            He quickly mumbles an apology and disappears amidst the stream of people towards the exit.`
                        },
                    {
                        "tag": 'div',
                        "class": 'float-right-container',
                        "children": [
                            {
                                "tag": 'p',
                                "text": `Yet you notice something the man left behind, right beneath your feet.
                                It is a chess piece. An exquisite one to be precise. 
                                It is made of marble, glistening in the light. 
                                The workmanship is immaculate, shaping the black surface into a beautiful pawn piece.`
                            },
                            {
                                "tag": 'img',
                                "class": 'float-right-img',
                                "src": "https://drive.google.com/uc?export=view&id=1uG4H6P9WH-Blj6iL87NKYr8sBcpdDDTh"
                            }
                        ]
                    }
                ],
                "options": {
                    "1": {
                        "effects": [
                            {
                                "type": "talk",
                                "info": ""
                            },
                            {
                                "type": "dialog",
                                "info": {
                                    "character": "",
                                    "target-stage": 1
                                }
                            }
                        ],
                        "lines": [
                            {
                                "tag": 'p',
                                "text": `You picked up the chess piece.`
                            }
                        ]
                    },
                    "2": {
                        "effects": [
                            {
                                "type": "require",
                                "info": {
                                    "require-type": "chapter",
                                    "require-target": 6,
                                    "modifier": "finished",
                                    "failure-lines": [
                                        {
                                            "tag": 'p',
                                            "text": `You have not fulfilled the requirements to choose this option.`
                                        }
                                    ]
                                }
                            },
                            {
                                "type": "end",
                                "info": "non-start end"
                            }
                        ],
                        "lines": [
                            {
                                "tag": 'p',
                                "text": `You ignored the dropped object and proceeded as usual.`
                            }
                        ]
                    }
                },
                "choices": ["Pick up the chess piece", "Ignore the chess piece"]
                },
            {
                "view": [
                    {
                        "tag": 'div',
                        "class": 'float-right-container',
                        "children": [
                            
                            {
                                "tag": 'img',
                                "class": 'float-right-img',
                                "src": "https://drive.google.com/uc?export=view&id=1eR81kip2DtTodckWQHs_uSa0HaxLdTNY"
                            },
                            {
                                "tag": 'div',
                                "class": 'non-margin',
                                "children": [
                                    {
                                        "tag": 'p',
                                        "text": `You pick up the chess piece and head for the reception desk. Yet strangely, no one is there.
                                            You notice a small piece of paper behind the counter. It seems like a reminder note, with the last line writing `,
                                        "children": [
                                            {
                                                "tag": 'span',
                                                "class": 'note',
                                                "text": `17:30 - check security camera.`
                                            }
                                        ]
                                    },
                                    {
                                        "tag": 'p',
                                        "text": `You glance across the room at the clock. The movement of its pendulum is mesmerizing: to the left, to the right, swinging rhythmically in the limited span enclosed by its wooden body.
                                            You look up the time. It says `,
                                        "children": [
                                            {
                                                "tag": 'span',
                                                "class": 'note',
                                                "text": `17:45.`
                                            }
                                        ]
                                    },
                                    {
                                        "tag": 'p',
                                        "class": 'status-description non-margin',
                                        "text": `What an unfortunate coincidence.`
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        "tag": 'p',
                        "text": `You keep on waiting, but no one comes back. The museum is closing around `,
                        "children": [
                            {
                                "tag": 'span',
                                "class": 'note',
                                "text": `18:15.`
                            },
                            {
                                "tag": 'span',
                                "text": `You have no choice but to take the chess piece home with you.`
                            }
                        ]
                    }
                ],
                "options": {
                    "1": {
                        "effects": [],
                        "lines": [
                            
                        ]
                    }
                },
            }
        ],
        "appearances": []
    }
]

Object.freeze(character_data)
export { character_data }