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
  time: Number,
  date: Date,
  film: FilmSchema,
  hall: HallSchema,
});

const CinemaSchema = new mongoose.Schema(
  {
    nameCinema: String,
    adress: String,
    number: Number,
    aboutCinema: String,
    timetable: [TimeTableSchema]
  }
);

module.exports = mongoose.model('Cinema', CinemaSchema, 'cinema');
