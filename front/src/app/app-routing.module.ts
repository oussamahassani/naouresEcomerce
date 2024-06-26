import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import {authGuard} from "./shared/app-common/secureroute/authguard.guard";
import {ProductDetailsComponentComponent} from "./pages/product-details-component/product-details-component.component";
import {ProdComponent} from "./pages/prod/prod.component";
import {CategoryProductsComponent} from "./pages/category-products/category-products.component";
import {PaymentComponent} from "./pages/payment/payment.component";
import {SuccessComponent} from "./pages/payment/success/success.component";
import {FailedComponent} from "./pages/payment/failed/failed.component";
import {UserSubscriptionsComponent} from "./pages/user-subscriptions/user-subscriptions.component";

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then(m => m.HomeModule),
    //canActivate: [authGuard]
  },
  {
    path: 'shop',
    loadChildren: () => import('./shop/shop.module').then(m => m.ShopModule),
    canActivate: [authGuard]
  },
  {
    path: 'pages',
    loadChildren: () => import('./pages/pages.module').then(m => m.PagesModule),
   // canActivate: [authGuard]
  },
  {
    path: 'home/products-details/:id',
    component: ProductDetailsComponentComponent
  },
  {
    path: 'category/products/:id',
    component: CategoryProductsComponent
  },
  {
    path: 'payment',
    component: PaymentComponent
  },
  {
    path: 'payment/success',
    component: SuccessComponent
  },
  {
    path: 'payment/failed',
    component: FailedComponent
  },
  {
    path: 'page/appusersubscriptions',
    component:UserSubscriptionsComponent
  },

  {
    path: '',
    redirectTo: 'pages/register', // Redirection vers la page d'accueil ('')
    pathMatch: 'full' // Correspondance complète du chemin
    //loadChildren: () => import('./pages/register/register.component').then(m => m.RegisterComponent)
  },
  {
    path: '**',
    component:NotFoundComponent
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes,{
    useHash: false,
    anchorScrolling: 'enabled',
    scrollPositionRestoration: 'enabled'
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
