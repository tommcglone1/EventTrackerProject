import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { Card } from '../models/card';

@Injectable({
  providedIn: 'root'
})
export class CardService {

private baseUrl = 'http://localhost:8085/'
private url = this.baseUrl + 'api/cards'

  constructor(
    private http: HttpClient
  ) {}

  index(): Observable<Card[]> {
    return this.http.get<Card[]>(this.url).pipe(
      catchError((err: any) => {
        console.log(err);
        return throwError(
          () => new Error('Card.index(): error retrieving cards: ' + err)
        );
      })
    );
  }


  show(cardId: number): Observable<Card>{
    return this.http.get<Card>(this.url + '/' + cardId).pipe(
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


    return this.http.post<Card>(this.url, card).pipe(
      catchError((err: any) => {
        console.log(err);
        return throwError(
          () => new Error('Card.create(): error creating card: ' + err)
        );
      })
    );
  }

  update(card: Card): Observable<Card>{
    return this.http.put<Card>(this.url +'/'+ card.id, card).pipe(
      catchError((err: any) => {
        console.log(err);
        return throwError(
          () => new Error('Todo.update(): error updating todo: ' + err)
        );
      })
    );
  }


  destroy(cardId: number): Observable<void>{

    return this.http.delete<void>(this.url +'/'+ cardId).pipe(
      catchError((err: any) => {
        console.log(err);
        return throwError(
          () => new Error(`Card.Delete(): error deleteing card: ${err}`)
        );
      })
    );
  }


  }

