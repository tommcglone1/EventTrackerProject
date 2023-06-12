import { Component, Input } from '@angular/core';
import { Card } from 'src/app/models/card';

@Component({
  selector: 'app-collection-stats',
  templateUrl: './collection-stats.component.html',
  styleUrls: ['./collection-stats.component.css'],
})
export class CollectionStatsComponent {
  @Input() transformedCards: Card[] = [];

  cardCount(): number {
    return this.transformedCards.length;
  }

  saleValue(): number {
    let total = 0;
    let cards = this.transformedCards;
    for (let card of cards) {
      if (card.saleValue) {
        total += card.saleValue;
      }
    }
    return total;
  }
  rookieCount() {
    let total = 0;
    let cards = this.transformedCards;
    for (let card of cards) {
      if (card.rookie) {
        total++;
      }
    }
    return total;
  }

  autoCount() {
    let total = 0;
    let cards = this.transformedCards;
    for (let card of cards) {
      if (card.autographed) {
        total++;
      }
    }
    return total;
  }

  gradedCount(): number {
    let total = 0;
    let cards = this.transformedCards;
    for (let card of cards) {
      if (card.grade) {
        total++;
      }
    }
    return total;
  }
}
