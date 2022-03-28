import { Component, NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CharacterComponent } from './components/character/character.component';
import { LoginComponent } from './components/login/login.component';
import { ProductMainComponent } from './components/product-main/product-main.component';
import { LoginGuard } from './shared/guards/login-guard/login.guard';

const routes: Routes = [{path: 'products', component: ProductMainComponent, canActivate: [LoginGuard]},
                        {path: 'login', component: LoginComponent},
                        { path: 'character', component: CharacterComponent, canActivate: [LoginGuard] }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
