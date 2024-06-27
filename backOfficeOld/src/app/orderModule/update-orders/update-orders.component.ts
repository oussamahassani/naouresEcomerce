import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AdsService } from "src/app/services/ads.service";
@Component({
  selector: 'app-update-orders',
  templateUrl: './update-orders.component.html',
  styleUrl: './update-orders.component.scss'
})
export class UpdateOrdersComponent implements OnInit {
  updateForm: FormGroup;
  produitId: string;
  isSuccessful: boolean = false;
  errorMessage = '';
  submitted = false;
  listStatus = [{ id: 1, label: "WAITING_PAYMENT" },
  { id: 2, label: "PAID" },
  { id: 3, label: "SHIPPED" },
  { id: 4, label: "DELIVERED" },
  { id: 5, label: "CANCELED" }];
  orders: any;
  constructor(
    private formBuilder: FormBuilder,
    private produitService: AdsService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.produitId = this.route.snapshot.params['id'];

    this.updateForm = this.formBuilder.group({
      orderStatus: ['', Validators.required],

    });

    // Fetch category data by ID and pre-fill the form
    this.produitService.getOneOrder(this.produitId).subscribe((orders: any) => {
      this.updateForm.patchValue({
        orderStatus: this.listStatus.find(el => el.label == orders.orderStatus).id
      });
      this.orders = orders;
    });
  }

  onSubmit(): void {
    if (this.updateForm.invalid) {
      return;
    }

    const updatedProduit = {
      id: this.produitId,
      orderStatus: this.updateForm.value.orderStatus,
    };

    // Call category service to update the category
    this.produitService.updateOrder(updatedProduit).subscribe(() => {
      console.log('Produit updated successfully');
      this.isSuccessful = true;
      this.router.navigate(['/orders']); // Redirect to produit list page
    }, error => {
      console.error('Error updating Produit:', error);
      // Handle error if necessary
    });
  }
}
