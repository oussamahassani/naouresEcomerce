import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

const API_URL = "http://localhost:8081/api/test/";

@Injectable({
  providedIn: "root",
})
export class UserService {
  constructor(private http: HttpClient) { }



  public getUserByEmail(email) {
    return this.http.get("http://localhost:8081/medecinsADR/" + email);
  }

  public getUserByPrenom(prenom) {
    return this.http.get("http://localhost:8081/medecinsPrenom/" + prenom);
  }

  public getUserBySpecialite(specialite) {
    return this.http.get("http://localhost:8081/medecinsSPC/" + specialite);
  }

  // recherche par nom et prenom njareb fyha
  public getUserByNomOrPrenom(): Observable<any> {
    return this.http.post<any>(
      "http://localhost:8081/medecins/search",
      "prenom  nom"
    );
  }

  getMedecin(id: number): Observable<any> {
    return this.http.get("http://localhost:8080/medecins/" + id);
  }

  //new
  getPublicContent(): Observable<any> {
    return this.http.get(API_URL + "all", { responseType: "text" });
  }

  getUserBoard(): Observable<any> {
    return this.http.get(API_URL + "user", { responseType: "text" });
  }

  getModeratorBoard(): Observable<any> {
    return this.http.get(API_URL + "mod", { responseType: "text" });
  }

  getAdminBoard(): Observable<any> {
    return this.http.get(API_URL + "admin", { responseType: "text" });
  }
}
