const config = require('./db');
const MongoClient = require('mongodb').MongoClient;

const client = new MongoClient(config.testUrl, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
});

exports.connect = function(callback) {
  client.connect((err, client) => {
    client.db('TEST_DB').collection("TEST_COLLECTION").insertOne({poshla: 'jara'}, (err, res) => console.log("TUT"))
    callback(err, client);
  })
}

