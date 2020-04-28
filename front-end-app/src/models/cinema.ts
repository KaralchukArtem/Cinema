export class CinemaModel {
    key:String;
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
      tickets: [{
        cinema:String;
        film:String;
        date:String;
        time:String;
        cost:Number;
        hall:String;
        number_of_tickets:Number;
      }]
}