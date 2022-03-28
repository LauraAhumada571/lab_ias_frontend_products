import { AppComponent } from './app.component';

// modules
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http/';
import { AppRoutingModule } from './app-routing.module';
import { ReactiveFormsModule } from '@angular/forms';

// components
import { ProductComponent } from './components/product/product.component';
import { ProductsListComponent } from './components/products-list/products-list.component';

// Services
import { ProductService } from './shared/services/product-service/product.service';
import { CategoryService } from './shared/services/category-service/category.service';
import { ProductMainComponent } from './components/product-main/product-main.component';
import { LoginComponent } from './components/login/login.component';
import { LoginService } from './shared/services/login-service/login.service';
import { LoginGuard } from './shared/guards/login-guard/login.guard';
import { RickAndMortyService } from './shared/services/rick-and-morty-api/rick-and-morty.service';
import { CharacterComponent } from './components/character/character.component';

@NgModule({
  declarations: [
    AppComponent,
    ProductComponent,
    ProductsListComponent,
    ProductMainComponent,
    LoginComponent,
    CharacterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [ProductService, CategoryService, LoginService, LoginGuard, RickAndMortyService],
  bootstrap: [AppComponent]
})
export class AppModule { }
