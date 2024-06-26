import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import {UrlBakend} from './utils'
@Injectable({
  providedIn: "root",
})
export class AdminService {
  private baseUrl = UrlBakend+"/admins";

  constructor(private http: HttpClient) {}

  public getAdminsList(): Observable<any> {
    return this.http.get(this.baseUrl);
  }

  getAdmin(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/${id}`);
  }

  createAdmin(admin: Object): Observable<Object> {
    return this.http.post(`${this.baseUrl}`, admin);
  }

  updateAdmin(id: number, value: any): Observable<Object> {
    return this.http.patch(`${this.baseUrl}/${id}`, value);
  }

  deleteAdmin(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`, { responseType: "text" });
  }
}
