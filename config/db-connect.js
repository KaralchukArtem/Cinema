const config = require('./db');
const mongoose = require("mongoose");
const { CinemaSchema } = require('../models/cinema-model')
const MongoClient = require('mongodb').MongoClient;

const Cinema = mongoose.model('Cinema', CinemaSchema);

exports.Cinema = Cinema;
exports.connect = function (callback) {
  mongoose.connect(config.testUrl, { useNewUrlParser: true, useUnifiedTopology: true}, (err, client) => {
        const c = new Cinema({});
        //... save new document in collection
        // c.save((err, cinema) => console.log(err, cinema))
        console.log('callback');
        callback(err, client);
  })
}
