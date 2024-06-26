import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AdsService } from '../../services/ads.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrl: './article.component.scss'
})
export class ArticleComponent {

  formData: FormData = new FormData();
  urlImageUser = "http://localhost:8081/imageUser/"

  currentPage = 1;
  page = 1;
  count = 0;
  pageSize = 3;
  pageSizes = [3, 6, 9];
  title = '';

  collection: any = [


  ];

  constructor(
    private postService: AdsService,
    private router: Router
  ) { }
  ngOnInit(): void {




    this.postService.getAllPost().subscribe((res: any) => {
      this.collection = res
    })
  }


  formatDate(dateString: any) {
    const date = new Date(dateString);
    return date.toDateString(); // "Wed Jun 25 2024"
  }
  list() {
    this.router.navigate(["/products"]);
  }

  handlePageSizeChange(event: any): void {
    console.log("page size", event)
    this.pageSize = event.target.value;
    this.page = 1;
    this.collection();
  }

  searchTitle(): void {
    this.page = 1;

  }
  handlePageChange(event: any): void {
    console.log("page chnge", event)
    //this.pageSize = event.target.value
    this.page = event;
    this.collection();
  }



}
