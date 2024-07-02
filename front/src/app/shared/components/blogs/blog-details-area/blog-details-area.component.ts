import { Component, Input } from '@angular/core';
import { UtilsService } from 'src/app/shared/services/utils.service';
import IBlogType from 'src/app/shared/types/blog-d-t';

@Component({
  selector: 'app-blog-details-area',
  templateUrl: './blog-details-area.component.html',
  styleUrls: ['./blog-details-area.component.scss']
})
export class BlogDetailsAreaComponent {
  @Input() blog!: IBlogType;
  urlImageBlog = "http://localhost:8081/imageUser/"
  public related_blogs: IBlogType[] = [];

  constructor(public utilsService: UtilsService) {
    this.utilsService.blogs.subscribe((blogs) => {
      this.related_blogs = blogs.slice(0, 2)
    });
  }
  getTimeElapsed(dateCreation: string): string {
    return new Date(dateCreation).toLocaleDateString('en-GB')
  }
}
