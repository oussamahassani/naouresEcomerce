import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {UrlBakend} from "./utils";
const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};
@Injectable({
  providedIn: 'root'
})
export class ProduitService {

  private baseUrl = UrlBakend;

  constructor(private http: HttpClient) { }

  public getallProduitList() {
    return this.http.get(`${this.baseUrl}/products`);
  }

  public getCategoryProductsList(id : string) {
    return this.http.get(`${this.baseUrl}/categories/${id}/products`);
  }
  public addNewPayement(obj : any) {
    return this.http.post(`${this.baseUrl}/products/addNewPayement`,obj);
  }
  

  getOneProduit(id: any): Observable<any> {
    return this.http.get(`${this.baseUrl}/products/${id}`);
  }
}
