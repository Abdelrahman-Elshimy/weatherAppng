import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';
import { NavComponent } from './nav/nav.component';
import { RouterModule } from '@angular/router';
import { NotFoundComponent } from './not-found/not-found.component';
import { HomeComponent } from './home/home.component';
import { FormsModule } from '@angular/forms';
import { LoginGuardGuard } from './guards/login-guard.guard';
import { LoginAuthGuardGuard } from './guards/login-auth-guard.guard';
import { FavoriteComponent } from './favorite/favorite.component';


@NgModule({
  declarations: [
    AppComponent,
    SignupComponent,
    LoginComponent,
    NavComponent,
    NotFoundComponent,
    HomeComponent,
    FavoriteComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot([
      {path: '', component: LoginComponent, canActivate: [LoginGuardGuard]},
      {path: 'signup', component: SignupComponent, canActivate: [LoginGuardGuard]},
      {path: 'home', component: HomeComponent, canActivate: [LoginAuthGuardGuard]},
      {path: 'favorite', component: FavoriteComponent, canActivate: [LoginAuthGuardGuard]},
      {path: '**', component: NotFoundComponent},
    ]),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
