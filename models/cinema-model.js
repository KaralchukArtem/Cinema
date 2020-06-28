const mongoose = require('mongoose');

const HallSchema = new mongoose.Schema({
  nameHall: String,
  amount: Number,
  vacancy: Number,
  busy: Number,
  row: Number,
  place: Number,
})

const FilmSchema = new mongoose.Schema({
  hall: HallSchema,
  name: String,
  long: Number,
  IMDb: Number,
  about: String,
  time: String,
  date: String,
});

const TimeTableSchema = new mongoose.Schema({
  film: [FilmSchema],
  dateStart: String,
  dateEnd: String,
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
    tickets: [TicketsSchema],
    hall: [HallSchema]
  }
);

exports.CinemaSchema = CinemaSchema;
