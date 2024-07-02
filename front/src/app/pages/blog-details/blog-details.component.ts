import { Component, OnInit } from '@angular/core';
import { UtilsService } from 'src/app/shared/services/utils.service';
import IBlogType from 'src/app/shared/types/blog-d-t';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoryService } from "../../shared/services/category.service";

@Component({
  selector: 'app-blog-details',
  templateUrl: './blog-details.component.html',
  styleUrls: ['./blog-details.component.scss']
})
export class BlogDetailsComponent {
  public blog!: any;

  constructor(public utilsService: UtilsService, private route: ActivatedRoute,
    private router: Router, private blogService: CategoryService) {
    let id = this.route.snapshot.params['id'];
    this.blogService.getArticleById(id).subscribe((res: any) => {
      this.blog = res
    });
  }
}
