import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeOneComponent } from './home-one/home-one.component';



const routes: Routes = [
  {
    path:'',
    component:HomeOneComponent,
    title:'CoinProfit ',
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
