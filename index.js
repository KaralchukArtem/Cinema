const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');
const Cinema = require('./routes/cinema-route');
const CinemaModel = require('./models/cinema-model');
const connect = require('./config/db-connect');

const app = express();

const PORT = process.env.PORT || 3000;


app.use(cors());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

app.use(function(req,res,next){
    console.log('Use connect');
    connect();
    next();
});

app.get('/', (req, res) => {
    res.send('Hello');
});
app.use('/Cinema', Cinema);
app.get('/Cinema', (req, res) => {
    CinemaModel.find({})
    .exec(function(err, cinema){
        if(err){
            console.log('Пезда');
        }else{
            res.json(cinema);
        }
    });
});

app.listen(PORT, () =>{
    console.log('Server start ' + PORT);
});


