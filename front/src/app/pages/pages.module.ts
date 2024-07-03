import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { SharedModule } from '../shared/shared.module';
import { PagesRoutingModule } from './pages-routing.module';
import { BlogComponent } from './blog/blog.component';
import { BlogNoSideComponent } from './blog-no-side/blog-no-side.component';
import { BlogDetailsComponent } from './blog-details/blog-details.component';
import { BlogDynamicDetailsComponent } from './blog-dynamic-details/blog-dynamic-details.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { ContactComponent } from './contact/contact.component';
import { AccountComponent } from './account/account.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { AuthentificationService } from "./services/auth/authentification.service";
import { HttpClientModule } from "@angular/common/http";
import { UploadFileService } from "./account/service/upload-file.service";
import { ProdComponent } from './prod/prod.component';
import { ProductDetailsComponentComponent } from './product-details-component/product-details-component.component';
import { CategoryProductsComponent } from './category-products/category-products.component';
import { PaymentComponent } from './payment/payment.component';
import { SuccessComponent } from './payment/success/success.component';
import { FailedComponent } from './payment/failed/failed.component';
import { UserSubscriptionsComponent } from './user-subscriptions/user-subscriptions.component';
import { MatDialogModule } from "@angular/material/dialog";
import { MatProgressBarModule } from "@angular/material/progress-bar";
import { RechercheProduit } from "./RechercheProduit/recherche-produit.component"

//import { RoueComponent } from './roue/roue.component';
//import { WheelSpinComponentComponent } from './wheel-spin-component/wheel-spin-component.component';
//import { SpinthewheelComponent } from './spinthewheel/spinthewheel.component';



@NgModule({
  declarations: [
    BlogComponent,
    BlogNoSideComponent,
    BlogDetailsComponent,
    BlogDynamicDetailsComponent,
    LoginComponent,
    RegisterComponent,
    CheckoutComponent,
    ContactComponent,
    AccountComponent,
    NotFoundComponent,
    ProdComponent,
    ProductDetailsComponentComponent,
    CategoryProductsComponent,
    //PaymentComponent,
    SuccessComponent,
    FailedComponent,
    RechercheProduit,
    UserSubscriptionsComponent,
    //   RoueComponent,
    // WheelSpinComponentComponent,
    // SpinthewheelComponent,
  ],
  imports: [
    CommonModule,
    PagesRoutingModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatDialogModule,
    MatProgressBarModule
  ],
  providers: [AuthentificationService, UploadFileService]
})
export class PagesModule { }
