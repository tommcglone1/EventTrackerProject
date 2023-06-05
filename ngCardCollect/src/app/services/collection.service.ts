import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, throwError, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AuthService } from './auth.service';
import { Card } from '../models/card';

@Injectable({
  providedIn: 'root',
})
export class CollectionService {
  private url = environment.baseUrl + 'api/myCollection';

  constructor(private auth: AuthService, private http: HttpClient) {}

  addSearchedCard(card: Card): Observable<void> {
    return this.http
      .post<void>(this.url + '/' + 'addCard', card, this.getHttpOptions())
      .pipe(
        catchError((err: any) => {
          console.log(err);
          return throwError(
            () => new Error('Card.add(): error adding card: ' + err)
          );
        })
      );
  }

  removeCardFromCollection(cardId: number): Observable<void> {
    return this.http
      .delete<void>(this.url + '/' + cardId, this.getHttpOptions())
      .pipe(
        catchError((err: any) => {
          console.log(err);
          return throwError(
            () => new Error(`Card.Delete(): error deleteing card: ${err}`)
          );
        })
      );
  }

  getHttpOptions() {
    let options = {
      headers: {
        Authorization: 'Basic ' + this.auth.getCredentials(),
        'X-Requested-With': 'XMLHttpRequest',
      },
    };
    return options;
  }
}
