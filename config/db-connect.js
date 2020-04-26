const config = require('./db');
const mongoose = require("mongoose");
const { CinemaSchema } = require('../models/cinema-model')
const MongoClient = require('mongodb').MongoClient;

const Cinema = mongoose.model('Cinema', CinemaSchema);

const sum = new Cinema({
  nameCinema: "Викинг",
  adress: "Одинцова 24",
  number: "8029666444333",
  aboutCinema: "Кинотеатр «Аврора» находится рядом со станцией метро «Пушкинская». На сегодняшний день это трехзальный"
  + " кинотеатр: «Красный» зал - 356, «Лазурный» зал – 200, зал «Комфорт» - 117. Залы оснащены современным цифровым оборудованием,"
  +" позволяющим демонстрировать фильмы в форматах 2D и 3D.  Кинотеатр имеет" 
  +" уютную кофейню «CinemaBar». Кинотеатр «Аврора» был открыт в 1988 году.",
    timetable: [
      {
        time: "10:45",
        date: "23-12-2020",
          film: {
            name: "Судный день",
            long: 140,
            IMDb: 8,
            about: "Старая добрая тема про конец света. На этот раз в фильме "
            +" Судный день (Doomsday) речь пойдет о смертельно опасном вирусе, от "
            +" которого нет лекарств. Прозванный жнецом вирус выкосил сотни тысяч людей.",
          },
          hall: {
            nameHall:  "Красный зал",
            amount:  50,
            vacancy:  50,
            busy:  0,
          },
      },
      {
        time: "12:40",
        date: "23-12-2020",
          film: {
            name: "Матрица",
            long: 150,
            IMDb: 8,
            about: "Культовый фантастический боевик «Матрица», снятый американскими"
            +" режиссёрами Лана и Эндрю Вачовски, вышел на экраны в 1999 году и положил начало трилогии.",
          },
          hall: {
            nameHall:  "Красный зал",
            amount:  50,
            vacancy:  50,
            busy:  0,
          },
      },
      {
        time: "16:40",
        date: "23-12-2020",
          film: {
            name: "Матрица",
            long: 150,
            IMDb: 8,
            about: "Культовый фантастический боевик «Матрица», снятый американскими"
            +" режиссёрами Лана и Эндрю Вачовски, вышел на экраны в 1999 году и положил начало трилогии.",
          },
          hall: {
            nameHall:  "Красный зал",
            amount:  50,
            vacancy:  50,
            busy:  0,
          },
      }
  ]
});

exports.Cinema = Cinema;
exports.connect = function (callback) {
  mongoose.connect(config.testUrl, { useNewUrlParser: true, useUnifiedTopology: true}, (err, client) => {
        const c = new Cinema({});
        //... save new document in collection
        // s.save((err, cinema) => console.log(err, cinema))
        console.log('callback');
        callback(err, client);
  })
}
