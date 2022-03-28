import { Component, NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { ProductMainComponent } from './components/product-main/product-main.component';
import { LoginGuard } from './shared/guards/login-guard/login.guard';

const routes: Routes = [{path: 'products', component: ProductMainComponent, canActivate: [LoginGuard]},
                        {path: 'login', component: LoginComponent}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
