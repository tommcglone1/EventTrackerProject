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
        if (allCards[i].id === userCards[j].id) {
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
