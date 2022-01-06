////////////////////////////////////////////////
//         USED JUST FOR DEVELOPMENT          //
////////////////////////////////////////////////

import IGame from "../interface/IGame.interfacets";

export const gameData: IGame[] = [
    {
        "_id": "adnhb32804rt09hj049238t6",
        "status": "draw-guess",
        "user1": {
            "img": "https://thumbs.dreamstime.com/b/cartoon-purple-monster-character-design-123472437.jpg",
            "isPlaying": true,
            "points": 8,
            "username": "Omiki",
            "_id": "jrtez72dogg580g",
        },
        "user2": {
            "img": "https://cdn4.vectorstock.com/i/1000x1000/88/48/friendly-monster-icon-cartoon-style-vector-20738848.jpg",
            "isPlaying": true,
            "points": 10,
            "username": "Ranji",
            "_id": "xomcb8l0la1hinf",
        },
        "rounds": [
            {
                "img": '',
                "guessingWord": 'dog',
                "userGuessingId": "jrtez72dogg580g",
                "userDrawingId": "xomcb8l0la1hinf",
                "level": 1,
                "time": 0,
            }
        ]
    }
]

