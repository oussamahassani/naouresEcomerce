import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { UrlBakend } from './utils'
const AUTH_API = UrlBakend + "/auth/";

const httpOptions = {
  headers: new HttpHeaders({ "Content-Type": "application/json" }),
};

@Injectable({
  providedIn: "root",
})
export class AuthService {
  constructor(private http: HttpClient) { }

  login(credentials): Observable<any> {
    return this.http.post(
      AUTH_API + "login",
      {
        email: credentials.email,
        password: credentials.password,
      },
      httpOptions
    );
  }

  register(ads): Observable<any> {
    return this.http.post(
      AUTH_API + "register",
      {
        nom: ads.nom,
        category: ads.category,
        role: ads.role,
        adresse: ads.adresse,
        prixVisite: ads.prixVisite,
      },
      httpOptions
    );
  }


}
