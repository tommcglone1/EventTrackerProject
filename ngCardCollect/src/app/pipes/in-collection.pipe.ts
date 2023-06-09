import { Pipe, PipeTransform } from '@angular/core';
import { Card } from '../models/card';

@Pipe({
  name: 'inCollection',
})
export class InCollectionPipe implements PipeTransform {
  transform(allCards: Card[], userCards: Card[]): Card[] {
    let notInCollection: Card[] = [];
    for (let i = 0; i < allCards.length; i++) {
      let match = false;
      for (let j = 0; j < userCards.length; j++) {
        if (
          allCards[i].playerName === userCards[j].playerName &&
          allCards[i].year === userCards[j].year &&
          allCards[i].boxSet === userCards[j].boxSet &&
          allCards[i].number === userCards[j].number
        ) {
          match = true;
        }
      }
      if (!match) {
        notInCollection.push(allCards[i]);
      }
    }
    return notInCollection;
  }
}
