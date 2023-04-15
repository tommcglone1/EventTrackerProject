import { Card } from 'src/app/models/card';
import { CardService } from './../../services/card.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

 cards: Card[] = [];

  constructor(
    private cardService: CardService
  ){}


  ngOnInit(): void {
    this.reload();
  }

  reload(){
    this.cardService.index().subscribe({
      next: (data) => {
        this.cards = data
      },
      error: (fail) => {

      }
    });
  }
}
