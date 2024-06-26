import { Component, OnInit } from '@angular/core';
import { AdsService } from "src/app/services/ads.service";
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from "src/app/services/user.service"
@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.scss'
})
export class ProductDetailsComponent implements OnInit {
  produit: any = {
    id: 2,
    name: "Product 2",
    description: "Description of Product 2",
    category: "1",
    price: 19.99,
    imgUrl: "https://example.com/product2.jpg"
  }
  produitId: string;
  detailPayement: any;
  userSelected: any;
  constructor(
    private produitService: AdsService,
    private router: Router,
    private route: ActivatedRoute,
    private userService: UserService,

  ) { }
  ngOnInit(): void {
    this.produitId = this.route.snapshot.params['id'];

    this.produitService.getOneProduit(this.produitId).subscribe((produit: any) => {
      this.produit = produit
      if (produit.isDone && produit.idUser) {
        this.userService.getUserById(produit.idUser).subscribe(res => {
          this.userSelected = res
        })
      }
    });
    this.produitService.getPayementOneProduit(this.produitId).subscribe((payement: any) => {
      this.detailPayement = payement
    });
  }
  list() {
    this.router.navigate(["products"]);

  }
  choisirUser(idUser: any) {
    this.produitService.updateProductPayament(idUser, this.produitId).subscribe((res: any) => {
      this.produitService.getOneProduit(this.produitId).subscribe((produit: any) => {
        this.produit = produit
      });
    })
  }

}
