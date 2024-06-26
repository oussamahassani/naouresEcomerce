import { Component } from '@angular/core';
import {PaymentService} from "../../shared/services/payment.service";
import {MatDialog} from "@angular/material/dialog";
import {FailedComponent} from "./failed/failed.component";


/**TODO
 * get current logged in user and set it's email , phone number..etc for payment request data
 */
@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss']
})
export class PaymentComponent {
 amount : any

  /**
   *
   * @param paymentService
   */
  constructor(private paymentService : PaymentService ,
              public dialog: MatDialog) {  }

  openFailedPaymentDialog(): void {
    this.dialog.open(FailedComponent);
  }

  initializePayment()
  {
 let userId =   localStorage.getItem("userId");
 let nameUser =   localStorage.getItem("nameUser");
 if(userId){
    const paymentData =
    {
      "receiverWalletId": "6636b7c8d65ce91d9ee46b65",
      "token": "TND",
      "amount": this.amount * 1000,
      "type": "immediate",
      "description": "Pack Payment",
      "acceptedPaymentMethods": [
      "wallet",
      "bank_card",
      "e-DINAR",
      "flouci"
    ],
      "lifespan": 10,
      "checkoutForm": true,
      "addPaymentFeesToAmount": true,
      "firstName": nameUser,
      "lastName": userId,
      "phoneNumber": "22777777",
      "email": userId,
      "orderId": "1234657",
      "webhook": "https://merchant.tech/api/notification_payment",
      "silentWebhook": true,
      "successUrl": "http://localhost:4200/payment/success",
      "failUrl": "http://localhost:4200/payment/failed",
      "theme": "light"
    }

    this.paymentService.initializePayment(paymentData).subscribe(
      next => {
        let object = {
          idUser :userId,
          montantPayement :this.amount,
          clickToPayOrder : next.paymentRef
        }
        this.paymentService.clicktopaysaveInitPayementInfo(object).subscribe(res =>{
          window.location.href = next.payUrl
        })
        
      },
      error => {
        console.log(error)
      }

    )
  }
  else {
    alert("vous dever vous connectez avant")
  }


}}
