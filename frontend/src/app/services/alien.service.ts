import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

import {environment} from '../../environments/environment';
import {Message} from "../../types/message";

@Injectable({
  providedIn: 'root'
})
export class AlienService {

  /**
   *
   * @param http
   */
  constructor(
    private readonly http: HttpClient
  ) {
  }

  /**
   *
   */
  getData(): Observable<any> {
    return this.http.get(`${environment.api.baseUrl}/messages`);
  }

  /**
   *
   */
  sendData(data: Message): Observable<any> {
    return this.http.post(`${environment.api.baseUrl}/messages`, data, {
      headers: {
        'x-api-key': '1234'
      }
    });
  }
}
