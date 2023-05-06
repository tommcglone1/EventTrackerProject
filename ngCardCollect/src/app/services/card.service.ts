import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { Card } from '../models/card';
import { environment } from 'src/environments/environment';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class CardService {


private url = environment.baseUrl + 'api/cards'

  constructor(
    private http: HttpClient,
    private auth: AuthService
  ) {}

  index(): Observable<Card[]> {
    return this.http.get<Card[]>(this.url, this.getHttpOptions()) .pipe(
      catchError((err: any) => {
        console.log(err);
        return throwError(
          () => new Error('Card.index(): error retrieving cards: ' + err)
        );
      })
    );
  }


  show(cardId: number): Observable<Card>{
    return this.http.get<Card>(this.url + '/' + cardId, this.getHttpOptions()).pipe(
      catchError((err: any) => {
        console.log(err);
        return throwError(
          () => new Error('Card.show(): error retrieving card: ' + err)
        );
      })
    );
  }

  create(card: Card): Observable<Card>{
    card.active = true;


    return this.http.post<Card>(this.url, card, this.getHttpOptions()).pipe(
      catchError((err: any) => {
        console.log(err);
        return throwError(
          () => new Error('Card.create(): error creating card: ' + err)
        );
      })
    );
  }

  update(card: Card): Observable<Card>{
    return this.http.put<Card>(this.url +'/'+ card.id, card, this.getHttpOptions()).pipe(
      catchError((err: any) => {
        console.log(err);
        return throwError(
          () => new Error('Todo.update(): error updating todo: ' + err)
        );
      })
    );
  }


  destroy(cardId: number): Observable<void>{

    return this.http.delete<void>(this.url +'/'+ cardId, this.getHttpOptions()).pipe(
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

