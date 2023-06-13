import { Component, Input } from '@angular/core';
import { Card } from 'src/app/models/card';

@Component({
  selector: 'app-collection-stats',
  templateUrl: './collection-stats.component.html',
  styleUrls: ['./collection-stats.component.css'],
})
export class CollectionStatsComponent {
  @Input() transformedCards: Card[] = [];
  username: string | null = '';

  ngOnInit(): void {
    this.username = localStorage.getItem('username');
  }

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

  averageCondition() {
    let total = 0;
    let cards = this.transformedCards;
    for (let card of cards) {
      total += card.condition.id;
    }
    return total / this.transformedCards.length;
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
