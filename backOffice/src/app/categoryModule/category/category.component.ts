import { Component,OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { AdsService } from "src/app/services/ads.service";

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrl: './category.component.scss'
})
export class CategoryComponent implements OnInit  {
  urlImageCategory = "http://localhost:8081/imageCategorie/"
  currentPage = 1;
  page = 1;
  count = 0;
  title="";
  pageSize = 3;
  pageSizes = [3, 6, 9];
  collection : any  = []
  constructor(
    private adsService: AdsService,
    private router: Router
  ) { }
  ngOnInit(): void {
this.getAllCategory()

}
getAllCategory(){
  this.adsService.getAllCategory().subscribe( (res:any) =>
  {
    this.collection = res;
  })
}
  searchTitle(): void {
    this.page = 1;
  }
  handlePageChange(event: number): void {
    this.page = event;
    this.collection();
  }
  handlePageSizeChange(event: any): void {
    this.pageSize = event.target.value;
    this.page = 1;
    this.collection();
  }
  update(id: any) {
    this.router.navigate(["category-update",id]);
  }
  delete(id: any) {
    var res = confirm("Êtes-vous sûr de vouloir supprimer?");
    if (res) {
      this.adsService.deleteCategory(id).subscribe((res:any) => {console.log(res)
        this.getAllCategory()
     }
      )}
  }
  addNew(){
    this.router.navigate(["createCategory"]);
  }
}
