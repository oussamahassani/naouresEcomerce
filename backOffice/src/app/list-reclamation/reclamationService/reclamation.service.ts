import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ReclamationService {
  private apiUrl = 'http://localhost:8081';

  constructor(private http: HttpClient) { }

  public getAllUsersByRole(role: string) {
    return this.http.get(`${this.apiUrl}/users?role=` + role);
  }
  public getAllReclamations() {
    return this.http.get(`${this.apiUrl}/reclamations`);
  }
  public updateReclamations(obj: any) {
    return this.http.put(`${this.apiUrl}/reclamations/${obj.id}`, obj);
  }
}
