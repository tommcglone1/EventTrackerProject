export class Filters {
  playerName: string | null;
  team: string | null;
  boxSet: string | null;
  year: number | null;
  autographed: boolean | null;
  rookie: boolean | null;
  manufacturer: string | null;


constructor(
  playerName: string = '',
  team: string = '',
    boxSet: string = '',
    year: number = 0,
    autographed: boolean = false,
    rookie: boolean = false,
    manufacturer: string = '',
){


  this.playerName = playerName;
  this.boxSet = boxSet;
    this.team = team;
    this.year = year;
    this.autographed = autographed;
    this.rookie = rookie;
    this.manufacturer = manufacturer;
}
}
