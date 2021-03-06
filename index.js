const express = require('express');
const config = require('./config/db');
const mongoose = require("mongoose");
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');
const CinemaRoute = require('./routes/cinema-route');
const { connect, Cinema , Account} = require('./config/db-connect');
const { query } = require('express');

const app = express();

const PORT = process.env.PORT || 3000;
const configDB = config.db;

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

    mongoose.connect(configDB, { useNewUrlParser: true, useUnifiedTopology: true}, (err, client) => {
      sum.save((err, cinema) => console.log(err, cinema))
      console.log('callback');
})

    res.send({result: sum});
})

//...добавление фильма которого нету
app.post('/db-save-timetable', (req,res) =>
{
  console.log(req.body);
  const query = req.body
  mongoose.connect(configDB, { useNewUrlParser: true, useUnifiedTopology: true}, (err, client) => {
    client.db.collection("cinemas").updateMany({"nameCinema": "Викинг"}, {
      $push : { 
        'timetable': {
            ...query
          }
      }})
    console.log('callback add-timetable');
  })
})

//...добавление времени фильма который уже есть
app.post('/db-save-film', (req,res) =>
{
  const query = req.body
  mongoose.connect(configDB, { useNewUrlParser: true, useUnifiedTopology: true}, (err, client) => {
    client.db.collection("cinemas").updateMany({"nameCinema": "Викинг",'timetable':{ $elemMatch: {'film' :{$elemMatch:{'name': query.name}}}}}, {
      $push : { 
          'timetable.$.film':{
            ...query
          }
      }
    })
    console.log('callback add-film');
  })
})


app.get('/db-view-cinema', (req,res) =>{

    mongoose.connect(configDB, { useNewUrlParser: true, useUnifiedTopology: true}, (err, client) => {
      if(err) return console.log(err);
      client.db.collection("cinemas").find({nameCinema:"Викинг"}).toArray((err, data) => {
        console.log(err, data)
        res.send({result:data});
      });
      
      console.log('callback - db-view-cinema');
    })
})

app.post('/updateHall', (req,res) =>{
  const query = req.body;
  console.log(query);
  console.log("updateHall");
  mongoose.connect(configDB, { useNewUrlParser: true, useUnifiedTopology: true}, (err, client) => {

    client.db.collection("cinemas").updateMany( {"nameCinema":"Викинг",'timetable':{ $elemMatch: {'film' :{$elemMatch:{'time': query.time}}}}, 'timetable':{ $elemMatch: {'film' :{$elemMatch:{'name': query.name}}}}}, 
    {
      $set : { 
        'timetable.$.film' : [{
          ...query
        }]
      }
    })
 
    //...add new document in collection
    // client.db.collection("cinemas").insertOne({"name": "Tom", "age": 28, languages: ["english", "spanish"]})
    console.log('callback - buy-ticket');
  })
})

app.get('/getTickets', (req,res) =>{

  mongoose.connect(configDB, { useNewUrlParser: true, useUnifiedTopology: true}, (err, client) => {
    if(err) return console.log(err);
    client.db.collection("cinemas").find({nameCinema:"Викинг"}).toArray((err, data) => {
      console.log(err, data)
      res.send({result:data[0].tickets});
    });
    
    console.log('callback - db-view-cinema');
  })
})

app.post('/createTicket', (req,res) =>{
  const query = req.body;
  console.log(query);
  console.log("createTicket");
  mongoose.connect(configDB, { useNewUrlParser: true, useUnifiedTopology: true}, (err, client) => {

    client.db.collection("cinemas").updateMany({"nameCinema":"Викинг"}, {
          $push : { 
            'tickets': {
                "nameCinema":"Викинг",
                "filmname":query.filmname,
                "datefilm":query.datefilm,
                "time":query.timefilm,
                "cost":query.cost,
                "nameHall":query.hallname,
                "number_of_tickets":query.number_of_tickets,
                "seat":{
                  'row': query.seat.row,
                  'cell': query.seat.cell
                }
              }
          }})
    //...add new document in collection
    // client.db.collection("cinemas").insertOne({"name": "Tom", "age": 28, languages: ["english", "spanish"]})
    console.log('callback - buy-ticket');
  })
})

app.post('/registration',(req,res) =>{
  const query = req.body;
  console.log(query)
  mongoose.connect(configDB, { useNewUrlParser: true, useUnifiedTopology: true}, (err, client) => {

    client.db.collection("account").save(
          {
            ...query
          });
    })
    console.log("callback - registration")
});

app.get('/login', (req, res) => {
  const query= req.query;
  console.log(query);
  connect((err,client) => {
    if (err) { console.error(err); return }
    client.db.collection("account").find({email:query.email, password:query.password}).toArray((err, data) => {
      console.log(err, data)
      if(data.length != 0) 
      res.send({result:data});
      else
      res.send({result:false});
    });
  })
  console.log("callback - login");
});


connect((err, client) => {app.get('*', (req,res) =>{
  res.sendFile(path.join(__dirname+'/public/index.html'));
});
  if (err) { console.error(err); return }
  //...search document in collection
  client.db.collection("cinemas").find({}).toArray((err, data) => console.log(err, data));
  
  app.locals.db = client.db;
  app.listen(PORT, () => {
    console.log('Server start : ' + PORT);
  });
});
