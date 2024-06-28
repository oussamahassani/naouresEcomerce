import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { UrlBakend } from "./utils";
const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};
@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private baseUrl = UrlBakend;
  constructor(private http: HttpClient) { }



  public getAllCategory() {
    return this.http.get(`${this.baseUrl}/categories`);
  }
  public getCategoryById(id: any) {
    return this.http.get(`${this.baseUrl}/categories/${id}`);
  }

  public getAllArticle() {
    return this.http.get(`${this.baseUrl}/posts`);
  }
}
