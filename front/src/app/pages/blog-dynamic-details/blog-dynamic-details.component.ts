import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap, of } from 'rxjs';
import { UtilsService } from 'src/app/shared/services/utils.service';

@Component({
  selector: 'app-blog-dynamic-details',
  templateUrl: './blog-dynamic-details.component.html',
  styleUrls: ['./blog-dynamic-details.component.scss']
})
export class BlogDynamicDetailsComponent {

  public blog: any | null | undefined;

  constructor(
    private route: ActivatedRoute,
    private utilsService: UtilsService,
    private router: Router
  ) { }

  ngOnInit() {
    this.route.paramMap.pipe(
      switchMap(params => {
        const blogId = params.get('id');
        if (blogId) {
          return this.utilsService.getBlogById(blogId);
        }
        return of<any | null>(null); // Emit null if there's no blogId
      })
    ).subscribe((blog: any | null | undefined) => {
      if (!blog) {
        // blog not found, navigate to 404 page
        this.router.navigate(['/404']);
      } else {
        this.blog = blog;
      }
    });
  }

}
