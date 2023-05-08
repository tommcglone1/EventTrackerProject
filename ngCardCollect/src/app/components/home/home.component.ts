import { Card } from 'src/app/models/card';
import { CardService } from './../../services/card.service';
import { Component, OnInit } from '@angular/core';

import { RookieCardPipe } from 'src/app/pipes/rookie-card.pipe';
import { AutoCardPipe } from 'src/app/pipes/auto-card.pipe';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit{
  cards: Card[] = [];
  cardProperties: string[] = [];

  selected: Card | null = null;
  gradeNumber: number | null = null;
  editCard: Card | null = null;
  gradeNames: string[] = [];
  creating: boolean = false;
  showStats: boolean = false;



  constructor(private cardService: CardService,
    private rookieCardPipe: RookieCardPipe,
    private autoCardPipe: AutoCardPipe
    ) {}

  ngOnInit(): void {

  }

  cardCount(): number{
     return this.cards.length;
  }

  displayRookieCards():Card[]{
    return this.rookieCardPipe.transform(this.cards);
  }

  displayRookieCardsCount(): number{
    return this.rookieCardPipe.transform(this.cards).length;
  }

  displayAutoCards():Card[]{
    return this.autoCardPipe.transform(this.cards);
  }

  displayAutoCardsCount(): number{
    return this.autoCardPipe.transform(this.cards).length;
  }






  setEditCard(){
    this.showStats = false;

    this.editCard = Object.assign({}, this.selected);
    this.gradeNumber  = this.editCard?.grade?.id !== undefined ? this.editCard?.grade?.id: null;
  }

  displayTable() {
    this.showStats = false;
    this.selected = null;
  }







  updateCard(card: Card) {
    if (!this.gradeNumber) {
      card.grade = null;
    } else {
      card.grade = { id: this.gradeNumber,
      name: '' };
    }

    this.cardService.update(card).subscribe({
      next: (updatedCard) => {
        console.log(updatedCard)
        this.editCard = null;
        this.selected = null;

      },
      error: (fail) => {
        console.error('Error updating card');
        console.error(fail);
      },
    });
  }

  // deleteCard(cardId: number) {
  //   this.cardService.destroy(cardId).subscribe({
  //     next: () => {

  //       this.selected=null;
  //     },
  //     error: (fail) => {
  //       console.error('Error deleting card');
  //       console.error(fail);
  //     },
  //   });
  // }
}
