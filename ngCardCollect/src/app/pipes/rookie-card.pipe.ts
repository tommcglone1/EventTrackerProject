import { Pipe, PipeTransform } from '@angular/core';
import { Card } from '../models/card';

@Pipe({
  name: 'rookieCard'
})
export class RookieCardPipe implements PipeTransform {

  transform(cards: Card[]): Card[] {
    let rookieCards: Card[] = [];
    for(let card of cards){
      if(card.rookie){
        rookieCards.push(card);
      }
    }
    return rookieCards;
  }

}
