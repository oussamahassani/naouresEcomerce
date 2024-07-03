import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { ProduitService } from "../../shared/services/produit.service";
import { AuthentificationService } from "../../pages/services/auth/authentification.service"
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-product-details-component',
  templateUrl: './product-details-component.component.html',
  styleUrls: ['./product-details-component.component.scss']
})
export class ProductDetailsComponentComponent implements OnInit {
  produit: any
  produitId: string | undefined;
  donatePrice: any;
  userconnected: any;
  baseimgUrl = "http://localhost:8081/imageProduit/"
  constructor(
    private produitService: ProduitService,
    private router: Router,
    private route: ActivatedRoute,
    private authService: AuthentificationService,
    private toastrService: ToastrService

  ) { }
  ngOnInit(): void {
    this.produitId = this.route.snapshot.params['id'];

    this.produitService.getOneProduit(this.produitId).subscribe((produit: any) => {
      this.produit = produit
    });
    let userId = localStorage.getItem("userId");
    this.authService.getUserCoonected(userId).subscribe((res: any) => {
      this.userconnected = res;
    })
  }
  list() {
    this.router.navigate(["/pages/prod"]);

  }
  donate() {
    let userId = localStorage.getItem("userId");
    let obj = {
      produit: this.produit.id,
      price: this.donatePrice,
      userId: userId
    }
    if (this.userconnected.sold >= this.donatePrice) {
      this.produitService.addNewPayement(obj).subscribe((res: any) => {
        console.log(res)
        this.toastrService.success(`donation success`);
        this.produitService.getOneProduit(this.produitId).subscribe((produit: any) => {
          this.produit = produit
        });
      })
    }
    else {
      alert("sold insufissent")
    }

  }
}
