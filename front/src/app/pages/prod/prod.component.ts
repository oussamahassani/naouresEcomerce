import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { ProduitService } from "../../shared/services/produit.service";
import { AuthentificationService } from "../../pages/services/auth/authentification.service"
import { ToastrService } from 'ngx-toastr';

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
  donateProduct = 0;
  selectedProduct: any;
  collection: any = [];
  userconnected: any;

  constructor(
    private authService: AuthentificationService,
    private productService: ProduitService,
    private router: Router,
    private toastrService: ToastrService,
  ) { }

  ngOnInit(): void {
    this.getAllProduct();
    let userId = localStorage.getItem("userId");
    this.authService.getUserCoonected(userId).subscribe((res: any) => {
      this.userconnected = res;
    })
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
    this.router.navigateByUrl(`/home/products-details/${id}`);
  }
  donate() {
    let userId = localStorage.getItem("userId");
    let obj = {
      produit: this.selectedProduct.id,
      price: this.donateProduct,
      userId: userId
    }
    if (this.userconnected.sold >= this.donateProduct) {
      this.productService.addNewPayement(obj).subscribe((res: any) => {
        console.log(res)
        this.toastrService.success(`donation success`);
      })
    }
    else {
      alert("sold insufissent")
    }

  }
  increaseQuantity(product: any) {
    this.selectedProduct = product;
    if (product.price >= this.donateProduct + 1) {

      console.log(100 / product.price)
      product.donate = (100 / product.price) * (this.donateProduct + 1);
      console.log((100 / product.price) * (this.donateProduct + 1))
      this.donateProduct += 1; // Augmentez la valeur de la quantité par 10, ajustez selon vos besoins
    }
  }
}
