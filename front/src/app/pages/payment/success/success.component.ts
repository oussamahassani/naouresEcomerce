import { Component , OnInit } from '@angular/core';
import {PaymentService} from "../../../shared/services/payment.service";
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-success',
  templateUrl: './success.component.html',
  styleUrls: ['./success.component.scss']
})
export class SuccessComponent implements OnInit {
  paymentRef: any ;

  constructor(private route: ActivatedRoute , private paymentService : PaymentService)
  {
 
   }
   ngOnInit(): void {
  
    const urlParams = new URLSearchParams(window.location.search);
    this.paymentRef = urlParams.get('payment_ref');
    console.log(this.paymentRef)
       this.paymentService.verifDetailPayement(this.paymentRef).subscribe(res => {
      console.log(res)
      let object ={
        clickToPayOrder :this.paymentRef
      }
      this.paymentService.getMontantByreference(object).subscribe(res => {
        let obj = {
          idUser : res.idUser,
          montantPayement:res.montantPayement,
          clickToPayOrder :res.approvalCode
        }
        this.paymentService.updteMontantUserAcount(obj).subscribe(res => {
          console.log(res)
        })
      })
    })
  }
}
