import { Component } from '@angular/core';
import { Router } from '@angular/router';
import category_data from 'src/app/shared/data/category-data';
import { UtilsService } from 'src/app/shared/services/utils.service';
import { ICategoryType } from 'src/app/shared/types/category-d-t';

@Component({
  selector: 'app-search-popup',
  templateUrl: './search-popup.component.html',
  styleUrls: ['./search-popup.component.scss']
})
export class SearchPopupComponent {

  public searchText: string = '';
  public productType: string = '';
  constructor (public utilsService:UtilsService,private router: Router){};

  handleProductType(productType: string) {
    if(productType === this.productType){
      this.productType = '';
    }
    else {
      this.productType = productType;
    }
  }

  handleSearchSubmit() {
    const queryParams: { [key: string]: string | null } = {};
    if(!this.searchText && !this.productType){
      return
    }
    else {
      if (this.searchText) {
        queryParams['searchText'] = this.searchText.split(' ').join('-').toLowerCase();
      }
      if (this.productType) {
        queryParams['productType'] = this.productType;
      }
      this.router.navigate(['/shop/search'], { queryParams });
    }
  }
}
