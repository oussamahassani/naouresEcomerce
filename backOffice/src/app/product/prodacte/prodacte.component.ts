import { Component,OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { AdsService } from "src/app/services/ads.service";

@Component({
  selector: 'app-prodacte',
  templateUrl: './prodacte.component.html',
  styleUrl: './prodacte.component.scss'
})
export class ProdacteComponent implements OnInit  {
  urlImageProduit = "http://localhost:8081/imageProduit/"

  currentPage = 1;
  page = 1;
  count = 0;
  pageSize = 3;
  pageSizes = [3, 6, 9];
  title = '';

  collection : any  = [


  ];

  constructor(
    private router: Router,
    private productService : AdsService,
  ) { }
  ngOnInit(): void {
    this.getAllProduct()

    }
  handlePageChange(event: any): void {

    this.pageSize = event.target.value
    this.page = 1;
    this.collection();
  }
  getAllProduct() {
this.productService.getallProduitList().subscribe((res:any) => {
  this.collection = res ;
})
  }
  delete(id: any) {
    var res = confirm("Êtes-vous sûr de vouloir supprimer?");
    if (res) { this.productService.deleteProduit(id).subscribe((res:any) => {console.log(res)
      this.getAllProduct()
   })
  }


      else
       console.log(res)


  }
  handlePageSizeChange(event: any): void {
    this.pageSize = event.target.value;
    this.page = 1;
    this.collection();
  }
  searchTitle(): void {
    this.page = 1;

  }

  Details(id: number) {
    this.router.navigate(["products-details", id]);
  }

  update(id: number) {
    this.router.navigate(["products-update", id]);
  }
}
