// angular import
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Project import
import { AdminComponent } from './theme/layouts/admin/admin.component';
import { GuestComponent } from './theme/layouts/guest/guest.component';
import { ProdacteComponent } from './product/prodacte/prodacte.component'
import { CreateProductComponent } from './product/create-product/create-product.component'
import { UpdateProductComponent } from './product/update-product/update-product.component'
import { ProductDetailsComponent } from './product/product-details/product-details.component'
import { OrdersComponent } from './orderModule/orders/orders.component'
import { UpdateOrdersComponent } from './orderModule/update-orders/update-orders.component'
import { CategoryComponent } from './categoryModule/category/category.component'
import { CategoryCreateComponent } from './categoryModule/category-create/category-create.component'
import { CategoryUpdateComponent } from './categoryModule/category-update/category-update.component'
import {SpinTheWheelComponent} from './spin-the-wheel/spin-the-wheel.component'
import { PackAddComponent } from './packModule/pack-add/pack-add.component'
import { PackListComponent } from './packModule/pack-list/pack-list.component'
import {ListeUserComponent} from './UserModule/liste-user/liste-user.component'
import {WhelhMangementComponent} from './whelh-mangement/whelh-mangement.component'
import {WhelleAddNewComponent} from './whelle-add-new/whelle-add-new.component'
import { AssistanteComponent } from './AssistanteModule/assistante/assistante.component';
import { AddAssistanteComponent } from './AssistanteModule/add-assistante/add-assistante.component';
import { ListReclamationComponent } from './list-reclamation/list-reclamation.component';

const routes: Routes = [
  {
    path: '',
    component: AdminComponent,
    children: [
      {
        path: '',
        redirectTo: '/dashboard/default',
        pathMatch: 'full'
      },
      {
        path: 'dashboard/default',
        loadComponent: () => import('./demo/default/dashboard/dashboard.component')
      },

      {
        path: 'products',
        component: ProdacteComponent
      },
      {
        path: 'newsproducts',
        component: CreateProductComponent
      },
      {
        path: 'products-details/:id',
        component: ProductDetailsComponent
      },
      {
        path: 'products-update/:id',
        component: UpdateProductComponent
      },
      {
        path: 'categories',
        component: CategoryComponent
      },
      {
        path: 'createCategory',
        component: CategoryCreateComponent
      },
      {
        path: 'category-update/:id',
        component: CategoryUpdateComponent
      },

      {
        path: 'orders',
        component: OrdersComponent
      },
      {
        path: 'order-update/:id',
        component: UpdateOrdersComponent
      },
      {
        path: 'add-pack',
        component: PackAddComponent
      },
      {
        path: 'pack',
        component: PackListComponent
      },

      {
        path: 'color',
        component: SpinTheWheelComponent
      },
      {
        path: 'user',
        component: ListeUserComponent
      },
      {
        path:'whellMangement',
        component:WhelhMangementComponent
      },
      {
        path:'addwhellMangement',
        component:WhelleAddNewComponent
      }
      ,
      {
        path:'Assistante',
        component:AssistanteComponent
      }
      ,
      {
        path:'add-assistante',
        component:AddAssistanteComponent
      },
      {
        path:'list-reclamation',
        component:ListReclamationComponent
      },
    ]
  },
  {
    path: '',
    component: GuestComponent,
    children: [
      {
        path: 'login',
        loadComponent: () => import('./demo/authentication/login/login.component')
      },
      {
        path: 'register',
        loadComponent: () => import('./demo/authentication/register/register.component')
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
