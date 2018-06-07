import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes} from '@angular/router';

import { AppComponent } from './app.component';
import { ContactsComponent } from './contacts/contacts.component';
import { ProductsComponent } from './products/products.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { HomeComponent } from './home/home.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProfileComponent } from './profile/profile.component';
import { NavbarComponent } from './navbar/navbar.component';

import { ValidateService} from './services/validate.service';
import { AuthService} from './services/auth.service';
import { FlashMessagesModule } from 'angular2-flash-messages';

const appRoutes: Routes = [
   {path:'home', component: HomeComponent},
   {path:'register', component: RegisterComponent},
   {path:'login', component: LoginComponent},
   {path:'dashboard', component: DashboardComponent},
   {path:'product', component: ProductsComponent},
   {path:'contact', component: ContactsComponent},
   {path:'profile', component: ProfileComponent}
]

@NgModule({
  declarations: [
    AppComponent,
    ContactsComponent,
    ProductsComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    DashboardComponent,
    ProfileComponent,
    NavbarComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule,
    RouterModule.forRoot(appRoutes),
    FlashMessagesModule.forRoot()
  ],
  providers: [ValidateService, AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
