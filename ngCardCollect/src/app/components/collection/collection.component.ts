import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Card } from 'src/app/models/card';
import { AutoCardPipe } from 'src/app/pipes/auto-card.pipe';
import { RookieCardPipe } from 'src/app/pipes/rookie-card.pipe';
import { CardService } from 'src/app/services/card.service';
import { CollectionService } from 'src/app/services/collection.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-collection',
  templateUrl: './collection.component.html',
  styleUrls: ['./collection.component.css']
})
export class CollectionComponent {

  cards: Card[] = [];
  selected: Card | null = null;

  constructor(private cardService: CardService,
    private rookieCardPipe: RookieCardPipe,
    private autoCardPipe: AutoCardPipe,
    private router: Router,
    private userService: UserService,
    private collectionService: CollectionService,
    ) {}

    ngOnInit(){
      this.reload();
    }
    reload() {

      this.cardService.index().subscribe({
        next: (data) => {
          this.cards = data;

          data.forEach((card) => {
            if(card.imgURL === ""){
              card.imgURL = 'https://lporegon.org/wp-content/uploads/2019/04/no-picture-provided.png'
            }

          });

        },
        error: (fail) => {
          console.error('Error reloading');
          console.error(fail);
        },
      });
    }

    deleteCard(cardId: number) {
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

  cardCount(): number{
    return this.cards.length;
 }
}
