import { CardCondition } from './card-condition';
import { CardGrade } from './card-grade';

export class Card {
  id: number;
  active: boolean;
  playerName: string;
  number: string;
  team: string | null;
  boxSet: string | null;
  type: string | null;
  imgURL: string | null;
  year: number | null;
  autographed: boolean | null;
  rookie: boolean | null;
  manufacturer: string | null;
  saleValue: number | null;
  tradeValue: number | null;
  spNumber: string | null;
  parallel: string | null;
  condition: CardCondition;
  grade: CardGrade | null;

  constructor(
    id: number = 0,
    active: boolean = false,
    playerName: string = '',
    number: string = '',
    team: string = '',
    boxSet: string = '',
    type: string = '',
    imgURL: string = '',
    year: number = 0,
    autographed: boolean = false,
    rookie: boolean = false,
    manufacturer: string = '',
    saleValue: number = 0,
    tradeValue: number = 0,
    spNumber: string = '',
    parallel: string = '',
    condition: CardCondition = new CardCondition(),
    grade: CardGrade | null = null
  ) {
    this.id = id;
    this.active = active;
    this.playerName = playerName;
    this.number = number;
    this.team = team;
    this.boxSet = boxSet;
    this.type = type;
    this.imgURL = imgURL;
    this.year = year;
    this.autographed = autographed;
    this.rookie = rookie;
    this.manufacturer = manufacturer;
    this.saleValue = saleValue;
    this.tradeValue = tradeValue;
    this.spNumber = spNumber;
    this.parallel = parallel;
    this.condition = condition;
    this.grade = grade;
  }
}
