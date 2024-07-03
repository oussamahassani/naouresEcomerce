// angular import
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { HttpClientModule } from '@angular/common/http';
import { NgxPaginationModule } from 'ngx-pagination';
import { ToastrModule } from 'ngx-toastr';


// project import
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { SharedModule } from './theme/shared/shared.module';
import { AdminComponent } from './theme/layouts/admin/admin.component';
import { GuestComponent } from './theme/layouts/guest/guest.component';
import { NavigationComponent } from './theme/layouts/admin/navigation/navigation.component';
import { NavBarComponent } from './theme/layouts/admin/nav-bar/nav-bar.component';
import { NavLeftComponent } from './theme/layouts/admin/nav-bar/nav-left/nav-left.component';
import { NavRightComponent } from './theme/layouts/admin/nav-bar/nav-right/nav-right.component';
import { NavContentComponent } from './theme/layouts/admin/navigation/nav-content/nav-content.component';
import { NavCollapseComponent } from './theme/layouts/admin/navigation/nav-content/nav-collapse/nav-collapse.component';
import { NavGroupComponent } from './theme/layouts/admin/navigation/nav-content/nav-group/nav-group.component';
import { NavItemComponent } from './theme/layouts/admin/navigation/nav-content/nav-item/nav-item.component';
import { ProdacteComponent } from './product/prodacte/prodacte.component';
import { CategoryComponent } from './categoryModule/category/category.component';
import { OrdersComponent } from './orderModule/orders/orders.component';
import { UpdateOrdersComponent } from './orderModule/update-orders/update-orders.component';
import { CreateProductComponent } from './product/create-product/create-product.component';
import { ProductDetailsComponent } from './product/product-details/product-details.component';
import { UpdateProductComponent } from './product/update-product/update-product.component';
import { CategoryCreateComponent } from './categoryModule/category-create/category-create.component';
import { CategoryUpdateComponent } from './categoryModule/category-update/category-update.component';
import { PayementsComponent } from './payements/payements.component';
import { SpinTheWheelComponent } from './spin-the-wheel/spin-the-wheel.component';
import { WheelSpinComponent } from './wheel-spin/wheel-spin.component';
import { PackListComponent } from './packModule/pack-list/pack-list.component';
import { PackAddComponent } from './packModule/pack-add/pack-add.component';
import { PackEditComponent } from './packModule/pack-edit/pack-edit.component';
import { ListeUserComponent } from './UserModule/liste-user/liste-user.component';
import { AddUserComponent } from './UserModule/add-user/add-user.component';
import { WhelhMangementComponent } from './whelh-mangement/whelh-mangement.component';
import { WhelleAddNewComponent } from './whelle-add-new/whelle-add-new.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AssistanteComponent } from './AssistanteModule/assistante/assistante.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { AddAssistanteComponent } from './AssistanteModule/add-assistante/add-assistante.component';
import { ListReclamationComponent } from './list-reclamation/list-reclamation.component';
import { MatTable } from '@angular/material/table';
import { MatToolbar } from '@angular/material/toolbar';
import { MatCard, MatCardContent, MatCardModule } from '@angular/material/card';
import { LoginComponent } from './login/login.component'
import { ArticleComponent } from './BlogModule/listeArticle/article.component'
import { AddArticleComponent } from './BlogModule/add-Article/add-article.component'
import { ProdactePayedComponent } from './product/prodactePayed/prodactePayed.component'
@NgModule({
  declarations: [
    AppComponent,
    AdminComponent,
    GuestComponent,
    NavigationComponent,
    NavBarComponent,
    NavLeftComponent,
    NavRightComponent,
    NavContentComponent,
    NavCollapseComponent,
    NavGroupComponent,
    NavItemComponent,
    ProdacteComponent,
    CategoryComponent,
    CategoryCreateComponent,
    CategoryUpdateComponent,
    OrdersComponent,
    UpdateOrdersComponent,
    CreateProductComponent,
    ProductDetailsComponent,
    UpdateProductComponent,
    PayementsComponent,
    SpinTheWheelComponent,
    WheelSpinComponent,
    PackListComponent,
    PackAddComponent,
    PackEditComponent,
    ListeUserComponent,
    AddUserComponent,
    WhelhMangementComponent,
    WhelleAddNewComponent,
    AssistanteComponent,
    AddAssistanteComponent,
    ListReclamationComponent,
    LoginComponent,
    ArticleComponent,
    AddArticleComponent,
    ProdactePayedComponent
  ],
  imports: [BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    SharedModule,
    BrowserAnimationsModule,
    NgxPaginationModule,
    HttpClientModule,
    FontAwesomeModule,
    ToastrModule.forRoot({
      timeOut: 3000,
      progressBar: false,
      enableHtml: true,
      positionClass: 'toast-top-center'
    }),
    NgbModule, MatTable, MatCardModule, MatToolbar, MatCardContent, MatCard

  ],
  bootstrap: [AppComponent],
  providers: [
    provideAnimationsAsync()
  ]
})
export class AppModule { }
