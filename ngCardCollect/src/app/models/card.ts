export class Card {
  id: number;
  playerName: string;
  number: number

  constructor(
    id: number = 0,
    playerName: string = '',
    number: number = 0,
  ){
    this.id = id;
    this.playerName = playerName;
    this.number = number;
  }

}
