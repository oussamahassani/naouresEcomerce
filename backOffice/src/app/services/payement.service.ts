import { Injectable } from "@angular/core";
import { CalendrierService } from "./calendrier-service.service";
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse,
} from "@angular/common/http";
import { catchError, tap } from "rxjs/operators";
import { Observable, throwError } from "rxjs";
@Injectable({
  providedIn: "root",
})
export class ReservationService {
  valide: boolean;
  calendrierId: any;
  dispo: any;
  httpOptions = {
    headers: new HttpHeaders({ "Content-Type": "application/json" }),
  };

  constructor(private http: HttpClient) { }
  private reservationUrl = "http://localhost:8080/reservations/";
  private reservationMedecinUrl =
    "http://localhost:8080/mesReservationsAgence/";
  createReservation(data): Observable<any> {
    return this.http.post(this.reservationUrl, data, this.httpOptions);
  }

  patchReservation(reservation): Observable<any> {
    return this.http.patch(this.reservationUrl, reservation).pipe(
      tap((data) => console.log(JSON.stringify(data))),
      catchError(this.handleError)
    );
  }
  GetReservation(id): Observable<any> {
    return this.http.get(this.reservationUrl + id).pipe(
      tap((data) => console.log(JSON.stringify(data))),
      catchError(this.handleError)
    );
  }
  getReservationListe(id): Observable<any> {
    return this.http.get(this.reservationMedecinUrl + id).pipe(
      tap((data) => console.log(JSON.stringify(data))),
      catchError(this.handleError)
    );
  }
  private handleError(err: HttpErrorResponse) {
    let errorMessage = "";
    if (err.error instanceof ErrorEvent) {
      errorMessage = `An error occured : ${err.error.message}`;
    } else {
      errorMessage = `Server returned code: ${err.status},error message is : ${err.message}`;
    }
    console.error(errorMessage);
    return throwError(errorMessage);
  }
}
