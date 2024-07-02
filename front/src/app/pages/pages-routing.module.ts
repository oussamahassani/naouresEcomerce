import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BlogComponent } from './blog/blog.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { ContactComponent } from './contact/contact.component';
import { AccountComponent } from './account/account.component';
import { HomeOneComponent } from "../home/home-one/home-one.component";
import { ProdComponent } from "./prod/prod.component";
import { BlogDetailsComponent } from "./blog-details/blog-details.component";
import { BlogNoSideComponent } from './blog-no-side/blog-no-side.component';
const routes: Routes = [

  {
    path: 'login',
    component: LoginComponent,
    title: 'Login Page',
  },
  {
    path: 'register',
    component: RegisterComponent,
    title: 'Register Page',
  },

  {
    path: 'contact',
    component: ContactComponent,
    title: 'Contact Page',
  },
  {
    component: BlogDetailsComponent,
    title: "blog details",
    path: "blog-details/:id"
  },
  {
    component: BlogNoSideComponent,
    title: "blog",
    path: "blog"
  },

  {
    path: 'home',
    component: HomeOneComponent,
    title: 'CoinProfit ',
  },
  {
    path: 'account',
    component: AccountComponent,
    title: 'Account Page',
  },
  {
    path: 'prod',
    component: ProdComponent,
    title: 'Produit Page',
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})

export class PagesRoutingModule { }
