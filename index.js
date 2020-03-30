const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');
const CinemaRoute = require('./routes/cinema-route');
const { connect, Cinema } = require('./config/db-connect');

const app = express();

const PORT = process.env.PORT || 3000;


app.use(cors());

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

app.use(CinemaRoute);

app.get('/cinemas', (req, res) => {
  Cinema.find({}, (err, cinemas) => {
    if (err) {
      console.log(err);
      res.send({ status: 'error', message: err.toString() })
      return;
    }
    res.send({ status: 'ok', cinemas })
  });
});

app.get('/db-save', (req,res) =>{
    const number1 = parseInt(req.query.num1);
    const number2 = parseInt(req.query.num2);
 
    // вычисляем сумму
    const sum = number1 + number2;

    res.send({result: sum});
})

connect((err, client) => {
  if (err) {
    console.error(err);
    return
  }
  //...search document in collection
  client.db.collection("cinemas").find({}).toArray((err, data) => console.log(err, data));
  
  app.locals.db = client.db;
  app.listen(PORT, () => {
    console.log('Server start : ' + PORT);
  });
});




