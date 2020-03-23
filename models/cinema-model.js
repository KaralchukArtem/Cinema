const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const config = require('../config/db');

const CinemaSchema = mongoose.Schema(
    {
        "nameCinema": "Beowulf",
        "adress": "Одинцова 23",
        "number": "80295556644",
        "aboutCinema":"Всё хорошо, туалет работает",
        "timetable":[{
            "time":"252525",
            "date":"131313",
            "film":{
                    "nameFilm": "ffffff",
                    "long":"ggggg",
                    "IMDb":"441",
                    "aboutFilm":"dfgerherh"
                },
            "hall":{
                    "nameHall":"",
                    "amount": 25,
                    "vacancy": 12,
                    "busy": 4
            }
        }]
    }
);

// const Cinema = module.exports = mongoose.model('Cinema', CinemaSchema);
module.exports = mongoose.model('Cinema', CinemaSchema,'cinema');