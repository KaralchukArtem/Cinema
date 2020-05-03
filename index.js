const express = require('express');
const config = require('./config/db');
const mongoose = require("mongoose");
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');
const CinemaRoute = require('./routes/cinema-route');
const { connect, Cinema , Account} = require('./config/db-connect');

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

    const sum = new Cinema({
      nameCinema: (req.query.nameCinema),
      adress: (req.query.adress),
      number: (req.query.number),
      aboutCinema: (req.query.aboutCinema),
        timetable: [{
          time: (req.query.time),
          date: (req.query.date),
          film: {
            name: (req.query.name),
            long: parseInt(req.query.long),
            IMDb: parseInt(req.query.IMDb),
            about: (req.query.about),
          },
          hall: {
            nameHall:  (req.query.nameHall),
            amount:  parseInt(req.query.amount),
            vacancy:  parseInt(req.query.vacancy),
            busy:  parseInt(req.query.busy),
          },
        }]
    });

    mongoose.connect(config.testUrl, { useNewUrlParser: true, useUnifiedTopology: true}, (err, client) => {
      sum.save((err, cinema) => console.log(err, cinema))
      console.log('callback');
})

    res.send({result: sum});
})

app.get('/db-view-cinema', (req,res) =>{

    mongoose.connect(config.testUrl, { useNewUrlParser: true, useUnifiedTopology: true}, (err, client) => {
      if(err) return console.log(err);
      client.db.collection("cinemas").find({nameCinema:"Викинг"}).toArray((err, data) => {
        console.log(err, data)
        res.send({result:data});
      });
      
      console.log('callback - db-view-cinema');
    })
})

app.get('/buy-ticket', (req,res) =>{
  query = req.query;
  mongoose.connect(config.testUrl, { useNewUrlParser: true, useUnifiedTopology: true}, (err, client) => {

    client.db.collection("cinemas").updateMany( {"nameCinema":"Викинг","timetable.time": query.time}, 
    {
      $set : { 
        'timetable.$.hall.amount': query.amount,
        'timetable.$.hall.vacancy': query.vacancy,
        'timetable.$.hall.busy': query.busy
      }
    })
    
    client.db.collection("cinemas").updateMany({"nameCinema":"Викинг"}, {
          $push : { 
            'tickets': {
                "nameCinema":query.nameCinema,
                "film":query.film,
                "date":query.date,
                "time":query.time,
                "cost":query.cost,
                "nameHall":query.nameHall,
                "number_of_tickets":query.number_of_tickets
              }
          }})
    //...add new document in collection
    // client.db.collection("cinemas").insertOne({"name": "Tom", "age": 28, languages: ["english", "spanish"]})
    console.log('callback - buy-ticket');
  })
})

app.get('/registration',(req,res) =>{
  query = req.query;
  console.log(query)
  mongoose.connect(config.testUrl, { useNewUrlParser: true, useUnifiedTopology: true}, (err, client) => {

    client.db.collection("account").save(
          {
            "email":query.email,
            "nickname":query.nickname,
            "password":query.password,
            'lower-admin-rights': {
                "flag":query.flag,
                "key":query.key
              }
          });
    })
    console.log("callback - registration")
});

app.get('/login', (req, res) => {
  query= req.query;
  connect((err,client) => {
    if (err) { console.error(err); return }
    client.db.collection("account").find({}).toArray((err, data) => console.log(err, data));
  })
  console.log("callback - login");
});

connect((err, client) => {
  if (err) { console.error(err); return }
  //...search document in collection
  client.db.collection("cinemas").find({}).toArray((err, data) => console.log(err, data));
  
  app.locals.db = client.db;
  app.listen(PORT, () => {
    console.log('Server start : ' + PORT);
  });
});
