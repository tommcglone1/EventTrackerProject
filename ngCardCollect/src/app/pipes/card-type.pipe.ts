import { Pipe, PipeTransform } from '@angular/core';
import { Card } from '../models/card';
import { Filters } from '../models/filters';

@Pipe({
  name: 'cardType'
})
export class CardTypePipe implements PipeTransform {

  transform(cards: Card[], filters: Filters| null): Card[] {

    if(!cards) return [];
    if(!filters){
      return cards;
    }

    return cards.filter(card => {
      let match: Boolean = true;


      if(filters?.playerName && !card.playerName.toLowerCase().includes(filters.playerName.toLowerCase())){
        match =false;
      }
      if(filters?.team && !card.team?.toLowerCase().includes(filters.team.toLowerCase())){
        match = false;
      }
      if(filters?.boxSet && !card.boxSet?.toLowerCase().includes(filters.boxSet.toLowerCase())){
        match = false;
      }
      if(filters?.year && card.year !== filters.year){
        match =false;
      }
      if(filters?.autographed && !card.autographed ){
        match =false;
      }
      if(filters?.rookie && !card.rookie) {
        match = false;
      }
      if(filters?.manufacturer && !card.manufacturer?.toLowerCase().includes(filters.manufacturer.toLowerCase())){
      match =false;
      }
      return match;
    });

  }

}
