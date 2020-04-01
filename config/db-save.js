const config = require('./db');
const mongoose = require("mongoose");
const { CinemaSchema } = require('../models/cinema-model')
const MongoClient = require('mongodb').MongoClient;

const Cinema = mongoose.model('Cinema', CinemaSchema);

exports.modelTime = new Cinema({
  nameCinema: String,
  adress: String,
  number: Number,
  aboutCinema: String,
    timetable: [{
      time: String,
      date: String,
      film: {
        name: String,
        long: Number,
        IMDb: Number,
        about: String,
      },
      hall: {
        nameHall: String,
        amount: Number,
        vacancy: Number,
        busy: Number,
      },
    }]
});

exports.Cinema = Cinema;
exports.connect = function (callback) {
  mongoose.connect(config.testUrl, { useNewUrlParser: true, useUnifiedTopology: true}, (err, client) => {
        const c = new Cinema({});
        //... save new document in collection
        // c.save((err, cinema) => console.log(err, cinema))
        // c.set(  {nameCinema: "Tema"}, {adress: "String"} )
        console.log('callback');
        callback(err, client);
  })
}
