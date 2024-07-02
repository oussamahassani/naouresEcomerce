
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from "rxjs";
import { RegisterRequest } from "../../../models/register-request";
import { AuthRequest } from "../../../models/auth-request";
import { AuthResponse } from "../../../models/auth-response";

@Injectable({
  providedIn: 'root'
})
export class AuthentificationService {
  baseUrl: string = 'http://localhost:8081';

  constructor(
    private http: HttpClient
  ) { }



  register(registerRequest: RegisterRequest) {
    // console.log("dataservice",registerRequest)
    return this.http.post<RegisterRequest>(`${this.baseUrl}/auth/register`, registerRequest);
  }
  getUserCoonected(iduser: any) {
    return this.http.get<any>(`${this.baseUrl}/users/${iduser}`)
  }
  login(AuthRequest: AuthRequest): Observable<any> {
    return this.http.post<AuthResponse>(`${this.baseUrl}/auth/login`, AuthRequest);
  }
  updatePassword(iduser: any, password: any) {
    return this.http.post<AuthResponse>(`${this.baseUrl}/users/updatePassword/${iduser}`, { password: password });
  }

  contactUs(data: any) {
    return this.http.post<any>(`${this.baseUrl}/auth/sendContactForm`, data);
  }


}
