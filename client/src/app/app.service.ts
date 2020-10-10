import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  constructor(private http: HttpClient) { }

  getRandomWord(): Observable<Object> {
    return this.http.get(`http://localhost:5124/`);
  }

  getRandomPhoto(): Observable<Object> {    
    return this.http.get(`http://localhost:5124/photo`);
  }

  checkAnswer(word, choice): Observable<Object> {
    const params = new HttpParams()
      .append('word', word)
      .append('answer', choice);

    return this.http.get(`http://localhost:5124/check`, { params: params });
  }
}
