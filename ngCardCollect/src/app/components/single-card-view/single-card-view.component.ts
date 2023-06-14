import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Card } from 'src/app/models/card';
import { CardService } from 'src/app/services/card.service';
import { CollectionService } from 'src/app/services/collection.service';

@Component({
  selector: 'app-single-card-view',
  templateUrl: './single-card-view.component.html',
  styleUrls: ['./single-card-view.component.css'],
})
export class SingleCardViewComponent {
  selected: Card | null = null;
  gradeNumber: number | null = null;
  editCard: Card | null = null;
  source: string | null = null;

  constructor(
    private currentRoute: ActivatedRoute,
    private cardService: CardService,
    private collectionService: CollectionService,
    private router: Router
  ) {}

  ngOnInit(): void {
    let cardId = this.currentRoute.snapshot.paramMap.get('cardId');
    this.source = this.currentRoute.snapshot.paramMap.get('source');
    if (cardId) {
      this.findCardById(parseInt(cardId));
    }
  }

  findCardById(cardId: number) {
    this.cardService.show(cardId).subscribe({
      next: (card) => {
        this.selected = card;
      },
      error: (err) => {
        console.error(err);
      },
    });
  }

  addSearchedCard(searchedCard: Card) {
    this.collectionService.addSearchedCard(searchedCard).subscribe({
      next: () => {
        window.alert('Card added to your collection!');
        this.router.navigateByUrl('/createcard');
      },
      error: (fail) => {
        console.error('Error adding card');
        console.error(fail);
      },
    });
  }

  setEditCard() {
    this.editCard = Object.assign({}, this.selected);
    this.gradeNumber =
      this.editCard?.grade?.id !== undefined ? this.editCard?.grade?.id : null;
  }
  updateCard(card: Card) {
    if (!this.gradeNumber) {
      card.grade = null;
    } else {
      card.grade = { id: this.gradeNumber, name: '' };
    }

    this.cardService.update(card).subscribe({
      next: (updatedCard) => {
        this.editCard = null;
        this.findCardById(updatedCard.id);
      },
      error: (fail) => {
        console.error('Error updating card');
        console.error(fail);
      },
    });
  }
}
