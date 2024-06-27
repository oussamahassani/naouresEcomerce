import { Component,OnInit } from '@angular/core';
import { AdsService } from "src/app/services/ads.service";

@Component({
  selector: 'app-whelh-mangement',
  templateUrl: './whelh-mangement.component.html',
  styleUrl: './whelh-mangement.component.scss'
})
export class WhelhMangementComponent implements OnInit {
  page = 1;
  count = 0;
  pageSize = 3;
  pageSizes = [3, 6, 9];
  title = '';

  collection : any  = []

  constructor(
    private productService : AdsService,
  ) { }
  ngOnInit(): void {
    this.getAllProduct()
  
    };

    handlePageChange(event: number): void {
      this.page = event;
      this.collection();
    }
    getAllProduct() {
  this.productService.getAllGameRoulette().subscribe((res:any) => {
    this.collection = res ;
  })
    }
    delete(id: any) {
      var res = confirm("Êtes-vous sûr de vouloir supprimer?");
      if (res) { this.productService.deleteroulette(id).subscribe((res:any) => {console.log(res)
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
    update(id: number) {
   console.log("update",id)
    }
    add() {
      console.log("add")

    }
  
}
