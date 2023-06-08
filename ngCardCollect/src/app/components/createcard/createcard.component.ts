import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Card } from 'src/app/models/card';
import { Filters } from 'src/app/models/filters';

import { CardService } from 'src/app/services/card.service';
import { CollectionService } from 'src/app/services/collection.service';

@Component({
  selector: 'app-createcard',
  templateUrl: './createcard.component.html',
  styleUrls: ['./createcard.component.css'],
})
export class CreatecardComponent implements OnInit {
  newCard: Card = new Card();
  gradeNumber: number | null = null;
  createNewCard: boolean = false;
  search: boolean = false;
  allCards: Card[] = [];
  filters: Filters | null = null;
  userCards: Card[] = [];

  constructor(
    private cardService: CardService,
    private router: Router,
    private collectionService: CollectionService
  ) {}

  ngOnInit(): void {
    this.reload();
    this.getAllCards();
  }

  reload() {
    this.cardService.index().subscribe({
      next: (data) => {
        this.userCards = data;
      },
      error: (fail) => {
        console.error('Error reloading');
        console.error(fail);
      },
    });
  }

  getAllCards() {
    this.cardService.getAllCards().subscribe({
      next: (data) => {
        this.allCards = data;
      },
      error: (fail) => {
        console.error('Error reloading');
        console.error(fail);
      },
    });
  }

  addCard(card: Card) {
    console.log(card);
    if (!this.gradeNumber) {
      card.grade = null;
    } else {
      card.grade = { id: this.gradeNumber, name: '' };
    }
    this.cardService.create(card).subscribe({
      next: (createdCard) => {
        this.newCard = new Card();
        this.router.navigateByUrl('/singleCardView/' + createdCard.id);
      },
      error: (fail) => {
        console.error('Error creating card');
        console.error(fail);
      },
    });
  }

  addSearchedCard(searchedCard: Card) {
    this.collectionService.addSearchedCard(searchedCard).subscribe({
      next: () => {
        window.alert('Card added to your collection!');
        this.reload();
      },
      error: (fail) => {
        console.error('Error adding card');
        console.error(fail);
      },
    });
  }

  displaySingleCard(card: Card) {
    this.router.navigateByUrl('/singleCardView/' + card.id);
  }

  handleFiltersSetting(setFilters: Filters | null) {
    this.filters = setFilters;
  }

  handleAppliedFiltersSetting(setFilters: Filters | null) {
    let noFilters = true;
    this.filters = setFilters;
    this.getAllCards();

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
