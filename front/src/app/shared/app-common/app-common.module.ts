import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import {HomeOneComponent} from "../../home/home-one/home-one.component";
import {SharedModule} from "../shared.module";
import {ShopModule} from "../../shop/shop.module";



@NgModule({
  declarations: [
    HomeOneComponent
  ],
  exports:[
    HomeOneComponent
  ],
  imports: [
    CommonModule,
    RouterLink,
    SharedModule,
    ShopModule
  ]
})
export class AppCommonModule { }
