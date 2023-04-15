import { Card } from 'src/app/models/card';
import { CardService } from './../../services/card.service';
import { Component } from '@angular/core';
import { CardGrade } from 'src/app/models/card-grade';
import { CardCondition } from 'src/app/models/card-condition';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  cards: Card[] = [];
  cardProperties: string[] = [];
  newCard: Card = new Card();
  selected: Card | null = null;
  gradeNumber: number | null = null;
  editCard: Card | null = null;
  gradeNames: string[] = [];
  creating: boolean = false;
  //cardGrade: CardGrade = new CardGrade();
  //cardCondition: CardCondition = new CardCondition();


  constructor(private cardService: CardService) {}

  ngOnInit(): void {
    this.reload();
  }

  cardCreate(){
    this.creating = true;
  }

  displaySingleCard(card: Card) {
    this.selected = card;
  }

  setEditCard(){
    console.log(this.selected)
    if(this.selected!.grade){
      let select = document.getElementById('grade')
      // select!.value = this.selected!.grade.id;
    }

    this.editCard = Object.assign({}, this.selected);
  }

  displayTable() {
    this.selected = null;
  }

  reload() {
    this.cardService.index().subscribe({
      next: (data) => {
        this.cards = data;
        data.forEach((card) => {
          if ( card.grade !==null &&  !this.gradeNames.includes(card.grade!.name)) {
            this.gradeNames.push(card.grade!.name);
          }
        });
        console.log(this.gradeNames);
      },
      error: (fail) => {},
    });
  }



  addCard(card: Card) {
    console.log(card);
    if (!this.gradeNumber) {
      card.grade = null;
    } else {
      card.grade = { id: this.gradeNumber,
      name: '' };
    }
    this.cardService.create(card).subscribe({
      next: (createdCard) => {
        console.log(createdCard);
        this.newCard = new Card();
        this.selected = createdCard;
        this.reload();
        this.creating = false;
      },
      error: (ohno) => {
        console.error('Error creating card');
        console.error(ohno);
      },
    });
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
        this.editCard = null;
        this.selected = updatedCard;
        this.reload();
      },
      error: (ohno) => {
        console.error('Error updating todo');
        console.error(ohno);
      },
    });
  }

  deleteCard(cardId: number) {
    this.cardService.destroy(cardId).subscribe({
      next: () => {
        this.reload();
        this.selected=null;
      },
      error: (ohno) => {
        console.error('Error createing todo');
        console.error(ohno);
      },
    });
  }
}
