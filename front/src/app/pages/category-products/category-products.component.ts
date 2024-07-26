import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {ProduitService} from "../../shared/services/produit.service";

@Component({
  selector: 'app-category-products',
  templateUrl: './category-products.component.html',
  styleUrls: ['./category-products.component.scss']
})
export class CategoryProductsComponent implements OnInit {

  urlImageProduit = "http://localhost:8081/imageProduit/"
  currentPage = 1;
  page = 1;
  count = 0;
  pageSize = 3;
  pageSizes = [3, 6, 9];
  title = '';

  collection : any  = [];

  constructor(private route: ActivatedRoute,
              private productService : ProduitService,
              private router: Router,
              ) { }


  ngOnInit() {

 
    this.route.params.subscribe(params => {
   //   this.getAllProduct(params['id']);
     this.productService.getCategoryProductsList(params['id']).subscribe(value => {
       console.log(value)
       this.collection = value ;
     })
    })


  }


  getAllProduct(idCtegory:any) {
    this.productService.getallProduitList().subscribe((res:any) => {
      console.log(res)
      this.collection = res ;
    })
  }

  Details(id: number) {
    this.router.navigateByUrl(`/ProductDetailsComponentComponent/${id}`);
  }



}
