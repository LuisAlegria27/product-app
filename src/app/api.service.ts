import { Observable } from 'rxjs';
import { HttpClient } from "@angular/common/http";
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})

export class ApiService {
  private baseURL= 'https://fakestoreapi.com/products';
  constructor(private http: HttpClient) { }

  /*getProducts() {
    this.http.get('https://fakestoreapi.com/products').subscribe((response) => {
      console.log(response))
    }
  });*/

  getProducts(): Observable<any> {
      return this.http.get(this.baseURL);
  }

  getProduct(id:number): Observable<any>{
    return this.http.get(`${this.baseURL}/${id}`);
  }

  createProduct(product: any): Observable<any>{
    return this.http.post(this.baseURL, product);
  }

  updateProduct(id: number, product: any): Observable<any>{
    return this.http.put(`${this.baseURL}/${id}`, product);
  }





}
