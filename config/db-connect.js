const config = require('./db');
const mongoose = require("mongoose");
const { CinemaSchema } = require('../models/cinema-model')

const Cinema = mongoose.model('Cinema', CinemaSchema);

exports.Cinema = Cinema;
exports.connect = function (callback) {
  mongoose.connect(config.testUrl, { useNewUrlParser: true }, (err, client) => {
    const c = new Cinema({});
    c.save((err, cinema) => console.log(err, cinema))
    callback(err, client);
  })
}

