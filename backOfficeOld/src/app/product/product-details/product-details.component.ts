import { Component, OnInit } from '@angular/core';
import { AdsService } from "src/app/services/ads.service";
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.scss'
})
export class ProductDetailsComponent implements OnInit {
  produit = {
    id: 2,
    name: "Product 2",
    description: "Description of Product 2",
    category: "1",
    price: 19.99,
    imgUrl: "https://example.com/product2.jpg"
  }
  produitId: string;

  constructor(
    private produitService: AdsService,
    private router: Router,
    private route: ActivatedRoute,


  ) { }
  ngOnInit(): void {
    this.produitId = this.route.snapshot.params['id'];

    this.produitService.getOneProduit(this.produitId).subscribe((produit: any) => {
      this.produit = produit
    });
  }
  list() {
    this.router.navigate(["products"]);

  }
}
