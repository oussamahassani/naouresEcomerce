import { Component,OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { AdsService } from "src/app/services/ads.service";

@Component({
  selector: 'app-pack-list',
  templateUrl: './pack-list.component.html',
  styleUrl: './pack-list.component.scss'
})
export class PackListComponent implements OnInit  {

    urlImagePack = "http://localhost:8081/imagePack/"
  currentPage = 1;
  page = 1;
  count = 0;
  pageSize = 3;
  pageSizes = [3, 6, 9];
  title = '';
  collection : any  = [];


  constructor(
    private router: Router,
    private packService : AdsService,
  ) { }
  ngOnInit(): void {
    this.getAllProduct()

    }
  handlePageChange(event: number): void {
    this.page = event;
    this.collection();
  }
  getAllProduct() {
this.packService.getallPackList().subscribe((res:any) => {
  this.collection = res;
})
  }
  delete(id: any) {
    var res = confirm("Êtes-vous sûr de vouloir supprimer?");
    if (res) {
      this.packService.deletePack(id).subscribe((res:any) => {
        console.log(res)
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



  update(id: number) {
    this.router.navigate(["pack-update", id]);
  }
}
