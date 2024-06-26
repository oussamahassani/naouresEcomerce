import { Component, OnInit } from '@angular/core';
import { AdsService } from "src/app/services/ads.service";
import { Router } from "@angular/router";

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.scss'
})
export class OrdersComponent implements OnInit {
  currentPage = 1;
  page = 1;
  count = 0;
  pageSize = 3;
  pageSizes = [3, 6, 9];
  title = '';
  constructor(
    private orderService: AdsService,
    private router: Router,

  ) { }
  order = []
  ngOnInit(): void {

    this.orderService.getAllOrder().subscribe((orders: any) => {
      this.order = orders
    });
  }

  update(id: number) {
    this.router.navigate(["order-update", id]);
  }

  handlePageChange(event: number): void {
    this.page = event;
  }
  handlePageSizeChange(event: any): void {
    this.pageSize = event.target.value;
    this.page = 1;
  }

  searchTitle(): void {
    this.page = 1;

  }
}
