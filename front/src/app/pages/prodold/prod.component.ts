import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { ProduitService } from "../../shared/services/produit.service";

@Component({
  selector: 'app-prod',
  templateUrl: './prod.component.html',
  styleUrls: ['./prod.component.scss']
})
export class ProdComponent implements OnInit {

  urlImageProduit = "http://localhost:8081/imageProduit/";
  currentPage = 1;
  page = 1;
  count = 0;
  pageSize = 3;
  pageSizes = [3, 6, 9];
  title = '';

  collection: any = [];

  constructor(
    private productService: ProduitService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.getAllProduct();
  }

  getAllProduct() {
    this.productService.getallProduitList().subscribe((res: any) => {
      console.log(res);
      this.collection = res;
      // Initialisation de la quantité à 0 si elle n'est pas définie
      this.collection.forEach((product: any) => {
        if (!product.quantity) {
          product.quantity = 0;
        }
      });
    });
  }

  Details(id: number) {
    this.router.navigateByUrl(`/products-details/${id}`);
  }

  increaseQuantity(product: any) {
    if (product.quantity < 100) {
      product.quantity += 10; // Augmentez la valeur de la quantité par 10, ajustez selon vos besoins
    }
  }
}
