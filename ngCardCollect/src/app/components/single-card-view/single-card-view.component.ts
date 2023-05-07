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

}
