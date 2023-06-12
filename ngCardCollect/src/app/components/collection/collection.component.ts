import { CardTypePipe } from './../../pipes/card-type.pipe';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Card } from 'src/app/models/card';
import { Filters } from 'src/app/models/filters';
import { CardService } from 'src/app/services/card.service';
import { CollectionService } from 'src/app/services/collection.service';

enum SortDirection {
  Ascending = 'asc',
  Descending = 'desc',
}

@Component({
  selector: 'app-collection',
  templateUrl: './collection.component.html',
  styleUrls: ['./collection.component.css'],
})
export class CollectionComponent {
  selected: Card | null = null;
  filters: Filters | null = null;
  userCards: Card[] = [];
  sadPuppy: String =
    'https://www.cutenessoverflow.com/wp-content/uploads/2016/09/Cute-Sad-Puppy.jpg';

  noImage: String =
    'https://lporegon.org/wp-content/uploads/2019/04/no-picture-provided.png';
  cardsInCollection: boolean = false;
  loading: boolean = true;

  currentSortColumn: keyof Card | null = null;
  currentSortDirection: SortDirection = SortDirection.Ascending;

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
        this.userCards = data;
        if (this.userCards.length > 0) {
          this.cardsInCollection = true;
        }
        this.loading = false;
      },
      error: (fail) => {
        this.loading = false;
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
    return this.cardTypePipe.transform(this.userCards, this.filters).length;
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

  sortTable(column: keyof Card): void {
    if (column === this.currentSortColumn) {
      this.currentSortDirection =
        this.currentSortDirection === SortDirection.Ascending
          ? SortDirection.Descending
          : SortDirection.Ascending;
    } else {
      this.currentSortColumn = column;
      this.currentSortDirection = SortDirection.Ascending;
    }

    this.userCards.sort((a, b) => {
      const aValue = a?.[column] ?? '';
      const bValue = b?.[column] ?? '';

      let result: number;

      if (aValue < bValue) {
        result = -1;
      } else if (aValue > bValue) {
        result = 1;
      } else {
        result = 0;
      }

      return this.currentSortDirection === SortDirection.Ascending
        ? result
        : -result;
    });
  }
}
