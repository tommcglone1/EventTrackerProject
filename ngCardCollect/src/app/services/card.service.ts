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
}
