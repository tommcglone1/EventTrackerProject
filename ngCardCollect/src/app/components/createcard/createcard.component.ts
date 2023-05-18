import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Card } from 'src/app/models/card';

import { CardService } from 'src/app/services/card.service';

@Component({
  selector: 'app-createcard',
  templateUrl: './createcard.component.html',
  styleUrls: ['./createcard.component.css'],
})
export class CreatecardComponent implements OnInit {
  newCard: Card = new Card();
  gradeNumber: number | null = null;

  constructor(private cardService: CardService, private router: Router) {}

  ngOnInit(): void {}

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
}
