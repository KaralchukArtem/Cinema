export class Tickets {
    public nameCinema: "Викинг";
    public filmname:String;
    public datefilm:String;
    public timefilm:String;
    public cost:number;
    public hallname:string;
    public number_of_tickets:Number;
    public seats:[Seat];
}

export class Seat {
  constructor(
    public row: number,
    public cell: number
  ) {
  }

}
