const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');
const Cinema = require('./routes/cinema-route');
const CinemaModel = require('./models/cinema-model');
const { connect } = require('./config/db-connect');

const app = express();

const PORT = process.env.PORT || 3000;


app.use(cors());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

app.use(Cinema);

app.get('/', (req, res) => {
  req.app.locals.db.collection("TEST_COLLECTION").find({}).toArray((err, data) => {
    if (err) {
      console.log(err);
      res.send({ status: 'error', message: err.toString() })
      return;
    }
    res.send({status: 'ok', data })
  })
});


connect((err, client) => {
  if (err) {
    console.error(err);
    return
  }
  client.db("TEST_DB").collection("TEST_COLLECTION").find({}).toArray((err, data) => console.log(err, data));
  app.locals.db = client.db("TEST_DB");
  app.listen(PORT, () => {
    console.log('Server start ' + PORT);
  });
});




