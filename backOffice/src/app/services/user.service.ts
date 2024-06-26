import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { UrlBakend } from './utils'


@Injectable({
  providedIn: "root",
})
export class UserService {
  constructor(private http: HttpClient) { }

  public getUserById(id: any) {
    return this.http.get(`${UrlBakend}/users/${id}`);
  }






}
