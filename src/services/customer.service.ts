import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  private baseUrl = 'http://localhost:5000/api/customers';

  constructor(private http: HttpClient) {}

  getCustomers(): Observable<any> {
    return this.http.get(this.baseUrl);
  }

  addCustomer(customer: any): Observable<any> {
    return this.http.post(this.baseUrl, customer);
  }

  getCustomerById(id: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/${id}`);
  }

  deleteCustomer(id: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }
}