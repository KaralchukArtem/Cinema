export class CinemaModel {
    nameCinema: String;
    adress: String;
    number: String;
    aboutCinema: String;
      timetable: [{
        time: String;
        date: String;
        film: {
          name: String;
          long: Number;
          IMDb: Number;
          about: String;
        },
        hall: {
          nameHall:  String;
          amount:  Number;
          vacancy: Number;
          busy:Number;
        }
      }];
}