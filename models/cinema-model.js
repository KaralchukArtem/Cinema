const mongoose = require('mongoose');

const HallSchema = new mongoose.Schema({
  nameHall: String,
  amount: Number,
  vacancy: Number,
  busy: Number,
})

const FilmSchema = new mongoose.Schema({
  name: String,
  long: Number,
  IMDb: Number,
  about: String,
});

const TimeTableSchema = new mongoose.Schema({
  time: String,
  date: String,
  film: FilmSchema,
  hall: HallSchema,
});

const TicketsSchema = new mongoose.Schema({
  nameCinema: String,
  film: String,
  date: String,
  time: String,
  cost: String,
  nameHall: String,
  number_of_tickets: String,
});

const CinemaSchema = new mongoose.Schema(
  {
    nameCinema: String,
    adress: String,
    number: String,
    aboutCinema: String,
    timetable: [TimeTableSchema],
    tickets: [TicketsSchema]
  }
);

exports.CinemaSchema = CinemaSchema;
