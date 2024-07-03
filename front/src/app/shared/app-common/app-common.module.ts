import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { HomeOneComponent } from "../../home/home-one/home-one.component";
import { SharedModule } from "../shared.module";



@NgModule({
  declarations: [
    HomeOneComponent
  ],
  exports: [
    HomeOneComponent
  ],
  imports: [
    CommonModule,
    RouterLink,
    SharedModule,

  ]
})
export class AppCommonModule { }
