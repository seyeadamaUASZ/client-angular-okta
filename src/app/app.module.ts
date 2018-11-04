import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import { CarListComponent } from './car-list/car-list.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatButtonModule, MatCardModule, MatInputModule, MatListModule, MatToolbarModule} from '@angular/material';
import { CarEditComponent } from './car-edit/car-edit.component';
import {RouterModule, Routes} from '@angular/router';
import {FormsModule} from '@angular/forms';
import {OktaAuthModule, OktaCallbackComponent} from '@okta/okta-angular';
import {AuthInterceptor} from './shared/okta/auth.interceptor';
import { HomeComponent } from './home/home.component';


const config={
  issuer : 'https://dev-153605.oktapreview.com/oauth2/default',
  redirectUri:'http://localhost:4200/implicit/callback',
  clientId:'0oag1ngmlvqKUkcSt0h7'
}

const appRoutes: Routes = [
  {path:'',redirectTo:'/home',pathMatch:'full'},
  {path:'home',component:HomeComponent},
  {
    path: 'car-list',
    component: CarListComponent
  },
  {
    path: 'car-add',
    component: CarEditComponent
  },
  {
    path: 'car-edit/:id',
    component: CarEditComponent
  },
  {
    path: 'implicit/callback',
    component: OktaCallbackComponent
  }
];

@NgModule({
  declarations: [
    AppComponent,
    CarListComponent,
    CarEditComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatCardModule,
    MatInputModule,
    MatListModule,
    MatToolbarModule,
    FormsModule,
    RouterModule.forRoot(appRoutes),
    OktaAuthModule.initAuth(config)
  ],
  providers: [{provide: HTTP_INTERCEPTORS,useClass:AuthInterceptor, multi:true}],
  bootstrap: [AppComponent]
})
export class AppModule { }
