import {Component, OnInit} from '@angular/core';
import {PaymentService} from "../../shared/services/payment.service";

@Component({
  selector: 'app-user-subscriptions',
  templateUrl: './user-subscriptions.component.html',
  styleUrls: ['./user-subscriptions.component.scss']
})
export class UserSubscriptionsComponent {
  /* cardData: any = {};
  apiUrl: any = {} ;
  constructor(private paymentService: PaymentService) { }


  submitForm() {
    this.paymentService.addCreditCard(this.cardData, this.apiUrl)
      .subscribe(
        response => {
          console.log('Carte bancaire ajoutée avec succès!', response);
          // Réinitialiser le formulaire ici si nécessaire
        },
        error => {
          console.error('Erreur lors de l\'ajout de la carte bancaire:', error);
          // Gérer les erreurs ici
        }
      );
  }*/
}
