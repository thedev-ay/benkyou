import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

const URL = environment.backendURL;
@Injectable({
  providedIn: 'root'
})
export class AppService {

  constructor(private http: HttpClient) { }

  getRandomWord(): Observable<Object> {
    return this.http.get(`${URL}/`);
  }

  getRandomPhoto(): Observable<Object> {    
    return this.http.get(`${URL}/photo`);
  }

  checkAnswer(word, choice): Observable<Object> {
    const params = new HttpParams()
      .append('word', word)
      .append('answer', choice);

    return this.http.get(`${URL}/check`, { params: params });
  }
}
