import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ApiService {

  private baseURL = 'http://localhost:5000/api'

  constructor(private http: HttpClient) {}

  testBackend(){
    return this.http.get(`${this.baseURL}/test`);
  }
}
