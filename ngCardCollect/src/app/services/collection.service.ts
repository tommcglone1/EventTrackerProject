import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class CollectionService {

  private url = environment.baseUrl + 'api/MyCollection'

  constructor(private auth: AuthService,
    private http: HttpClient,
    )
    { }


  removeCardFromCollection(cardId: number){
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
