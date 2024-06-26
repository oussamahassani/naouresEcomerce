import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { UrlBakend } from "./utils";
@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  private paymentUrl = "https://api.preprod.konnect.network/api/v2/payments/init-payment";
  constructor(private http: HttpClient) { }
  clicktopaysaveInitPayementInfo(infoPayement: any) {

    let UrlVerification = `${UrlBakend}/payment/saveInitPayement`;

    return this.http.post<any>(UrlVerification, infoPayement);
  }
  getAllPayementOrder(idUser: any) {

    let UrlVerification = `${UrlBakend}/payment/getOrderByUser/${idUser}`;

    return this.http.get<any>(UrlVerification);
  }
  getDetailsPayementByUser(idUser: any) {

    let UrlVerification = `${UrlBakend}/products/getPayement/${idUser}`;

    return this.http.get<any>(UrlVerification);
  }
  postNewReclamation(obj: any) {

    let UrlVerification = `${UrlBakend}/reclamations/add`;

    return this.http.post<any>(UrlVerification, obj);
  }
  getReclamationByCurrentUser(idUser: any) {

    let UrlVerification = `${UrlBakend}/reclamations/byUser/${idUser}`;

    return this.http.get<any>(UrlVerification);
  }
  getMontantByreference(infoPayement: any) {

    let UrlVerification = `${UrlBakend}/payment/getMontantByreference`;

    return this.http.post<any>(UrlVerification, infoPayement);
  }
  updteMontantUserAcount(updteMontantUserAcount: any) {
    let UrlVerification = `${UrlBakend}/payment/updteMontantUserAcount`;

    return this.http.post<any>(UrlVerification, updteMontantUserAcount);
  }
  verifDetailPayement(payementId: any) {

    let UrlVerification = `https://api.preprod.konnect.network/api/v2/payments/${payementId}`;
    const headers = new HttpHeaders().set('x-api-key', '6636b7c8d65ce91d9ee46b61:Kp1qjN1b5hRTlCOTbC98')
    return this.http.get<any>(UrlVerification, { headers });
  }
  initializePayment(data: any) {
    const headers = new HttpHeaders().set('x-api-key', '6636b7c8d65ce91d9ee46b61:Kp1qjN1b5hRTlCOTbC98')
    return this.http.post<any>(this.paymentUrl, data, { headers });
  }

  addCreditCard(cardData: any, apiUrl: any): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer VOTRE_JETON' // Remplacez VOTRE_JETON par votre jeton d'authentification si nécessaire
      })
    };
    return this.http.post<any>(apiUrl, cardData, httpOptions);
  }
}
