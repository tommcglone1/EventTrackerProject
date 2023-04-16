import { Pipe, PipeTransform } from '@angular/core';
import { Card } from '../models/card';

@Pipe({
  name: 'autoCard'
})
export class AutoCardPipe implements PipeTransform {

 transform(cards: Card[]): Card[] {
    let autoCards: Card[] = [];
    for(let card of cards){
      if(card.autographed){
        autoCards.push(card);
      }
    }
    return autoCards;
  }

}
