import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import Swiper from 'swiper';
import { IHeroSlider } from 'src/app/shared/types/hero-slider-t';
import { HeroSliderData } from 'src/app/shared/data/hero-slider-data';
import { CategoryService } from "../../shared/services/category.service";

@Component({
  selector: 'app-home-one',
  templateUrl: './home-one.component.html',
  styleUrls: ['./home-one.component.scss']
})

export class HomeOneComponent implements OnInit {

  urlImageCategory = "http://localhost:8081/imageCategorie/"
  urlImageBlog = "http://localhost:8081/imageUser/"
  currentPage = 1;
  page = 1;
  count = 0;
  title = "";
  pageSize = 3;
  pageSizes = [3, 6, 9];
  collection: any = []
  article: any = []
  @ViewChild('heroSliderContainer') heroSliderContainer!: ElementRef;
  public swiperInstance: Swiper | undefined;
  public hero_slider_data: IHeroSlider[] = HeroSliderData.hero_slider_one;

  constructor(private adsService: CategoryService) { }

  ngOnInit() {
    this.getAllCategory()
  }

  getAllCategory() {
    this.adsService.getAllCategory().subscribe((res: any) => {
      this.collection = res;
    })
    this.adsService.getAllArticle().subscribe(res => {
      this.article = res
    })
  }


}
