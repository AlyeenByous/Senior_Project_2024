import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  apiUrl = 'https://a94kwl6zm1.execute-api.us-east-1.amazonaws.com';

  constructor(private http: HttpClient) { }

  getItemById(id:String): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/getItemById/${id}`);
  }

  getItems(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/getItem`);
  }
  
}