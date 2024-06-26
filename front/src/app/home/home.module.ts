import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeRoutingModule } from './home-routing.module';
import { SharedModule } from '../shared/shared.module';
import { HomeOneComponent } from './home-one/home-one.component';

import { ShopModule } from '../shop/shop.module';
import {HttpClientModule} from "@angular/common/http";



@NgModule({
  declarations: [
    HomeOneComponent,

  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    HttpClientModule,
    SharedModule,
    ShopModule,
  ]
})
export class HomeModule { }
