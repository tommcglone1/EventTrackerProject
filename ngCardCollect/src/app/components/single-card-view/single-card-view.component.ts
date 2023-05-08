import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Card } from 'src/app/models/card';
import { CardService } from 'src/app/services/card.service';

@Component({
  selector: 'app-single-card-view',
  templateUrl: './single-card-view.component.html',
  styleUrls: ['./single-card-view.component.css']
})
export class SingleCardViewComponent {

  selected: Card | null = null;
  gradeNumber: number | null = null;
  editCard: Card | null = null;

  constructor(
    private currentRoute: ActivatedRoute,
    private cardService: CardService,
  ){}

  ngOnInit(): void {
    let cardId = this.currentRoute.snapshot.paramMap.get("cardId");
    if(cardId){

      this.findCardById(parseInt(cardId));
    }
  }

  findCardById(cardId: number){
    this.cardService.show(cardId).subscribe({
      next:(card) =>{
        this.selected = card;
      },
      error:(err) =>{
        console.error(err);
      }
    });
  }

  setEditCard(){


    this.editCard = Object.assign({}, this.selected);
    this.gradeNumber  = this.editCard?.grade?.id !== undefined ? this.editCard?.grade?.id: null;
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
        this.findCardById(updatedCard.id)


      },
      error: (fail) => {
        console.error('Error updating card');
        console.error(fail);
      },
    });
  }
}
