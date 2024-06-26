import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl = 'http://localhost:8081/auth';

  constructor(private http: HttpClient) { }

  login(email: string, password: string): Observable<string> {
    return this.http.post<any>(`${this.baseUrl}/login`, { email, password });
  }
}
