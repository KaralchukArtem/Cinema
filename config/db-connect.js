const config = require('./db');
const mongoose = require("mongoose");
const { CinemaSchema } = require('../models/cinema-model')
const { AccountSchema } = require('../models/account-model')
const MongoClient = require('mongodb').MongoClient;

const Cinema = mongoose.model('Cinema', CinemaSchema);
const Account = mongoose.model('Account', AccountSchema);

exports.Account = Account;
exports.Cinema = Cinema;
exports.connect = function (callback) {
  mongoose.connect(config.db, { useNewUrlParser: true, useUnifiedTopology: true}, (err, client) => {
        // const c = new Cinema({});
        console.log('callback');
        callback(err, client);
  })
}
