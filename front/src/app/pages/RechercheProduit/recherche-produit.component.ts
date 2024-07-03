import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ViewportScroller } from '@angular/common';
import { ProduitService } from 'src/app/shared/services/produit.service';
@Component({
  selector: 'app-recherche-produit',
  templateUrl: './recherche-produit.component.html',
  styleUrls: ['./recherche-produit.component.scss'],
})
export class RechercheProduit {
  public products: any[] = [];
  public filteredProducts: any[] = [];
  public searchText: string = '';
  public productType: string = '';
  public perView: number = 8;
  public sortBy: string = 'asc';

  urlImageProduit = "http://localhost:8081/imageProduit/"

  constructor(
    private productService: ProduitService,
    private route: ActivatedRoute,
    private router: Router,
    private viewScroller: ViewportScroller
  ) {
    this.route.queryParams.subscribe((params) => {
      this.searchText = params['searchText'] || '';
      this.productType = params['productType'] || '';
      this.sortBy = params['sortBy'] || 'asc';

      this.productService.getallProduitList().subscribe((productData: any) => {
        this.products = productData;

        switch (this.sortBy) {
          case 'asc':
            this.products = this.products.sort((a, b) => {
              if (a.title < b.title) {
                return -1;
              } else if (a.title > b.title) {
                return 1;
              }
              return 0;
            })
            break;

          case 'high':
            this.products = this.products.sort(
              (a, b) => Number(a.price) - Number(b.price)
            );
            break;

          case 'low':
            this.products = this.products.sort(
              (a, b) => Number(b.price) - Number(a.price)
            );
            break;

          case 'sale':
            this.products = this.products.filter((p) => p.discount! > 0);
            break;

          default:
            this.products = productData;
            break;
        }

        if (this.searchText && !this.productType) {
          if (productData.length > 0) {
            console.log("this.productData", productData)
            this.products = productData.filter((el: any) =>
              el.name.toString().toLowerCase().includes((this.searchText).toLowerCase())
            )
            console.log("this.products", this.products)
            console.log("this.searchText", this.searchText)
          }





        }
        if (this.productType && !this.searchText) {
          this.products = productData.filter(
            (prd: any) => prd.category.toLowerCase() === this.productType.toLowerCase()
          );
        }

        if (this.productType && this.searchText) {
          this.products = productData
            .filter(
              (prd: any) => prd.category.toLowerCase() === this.productType.toLowerCase()
            )
            .filter((p: any) =>
              p.title.toLowerCase().includes(this.searchText.toLowerCase())
            );
        }

      });
    });
  }

  ngOnInit(): void { }

  handlePerView(): void {
    this.perView += 4;
  }

  onSortingChange(value: string) {
    this.sortByFilter(value);
  }

  // SortBy Filter
  sortByFilter(value: string) {
    this.router
      .navigate([], {
        relativeTo: this.route,
        queryParams: { sortBy: value ? value : null },
        queryParamsHandling: 'merge',
        skipLocationChange: false,
      })
      .finally(() => {
        this.viewScroller.setOffset([120, 120]);
        this.viewScroller.scrollToAnchor('products');
      });
  }

  // product Pagination
  setPage(page: number) {
    this.router
      .navigate([], {
        relativeTo: this.route,
        queryParams: { page: page },
        queryParamsHandling: 'merge',
        skipLocationChange: false
      })
      .finally(() => {
        this.viewScroller.setOffset([120, 120]);
        this.viewScroller.scrollToAnchor('products');
      });
  }
  Details(id: number) {
    this.router.navigateByUrl(`/home/products-details/${id}`);
  }
}
