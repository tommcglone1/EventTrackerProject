import { CardTypePipe } from './../../pipes/card-type.pipe';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Card } from 'src/app/models/card';
import { Filters } from 'src/app/models/filters';
import { CardService } from 'src/app/services/card.service';
import { CollectionService } from 'src/app/services/collection.service';

@Component({
  selector: 'app-collection',
  templateUrl: './collection.component.html',
  styleUrls: ['./collection.component.css'],
})
export class CollectionComponent {
  cards: Card[] = [];
  selected: Card | null = null;
  filters: Filters | null = null;

  constructor(
    private cardService: CardService,
    private router: Router,
    private collectionService: CollectionService,
    private cardTypePipe: CardTypePipe
  ) {}

  ngOnInit() {
    this.reload();
  }
  reload() {
    this.cardService.index().subscribe({
      next: (data) => {
        this.cards = data;
      },
      error: (fail) => {
        console.error('Error reloading');
        console.error(fail);
      },
    });
  }

  removeCard(cardId: number) {
    this.collectionService.removeCardFromCollection(cardId).subscribe({
      next: () => {
        this.reload();
      },
      error: (fail) => {
        console.error('Error deleting card');
        console.error(fail);
      },
    });
  }

  displaySingleCard(card: Card) {
    this.router.navigateByUrl('/singleCardView/' + card.id);
  }

  cardCount(): number {
    return this.cardTypePipe.transform(this.cards, this.filters).length;
  }

  handleFiltersSetting(setFilters: Filters | null) {
    this.filters = setFilters;
  }

  handleAppliedFiltersSetting(setFilters: Filters | null) {
    let noFilters = true;
    this.filters = setFilters;
    this.reload();

    for (const key in this.filters) {
      if (this.filters[key]) {
        noFilters = false;
      }
    }
    if (noFilters) {
      this.filters = null;
    }
  }
}
