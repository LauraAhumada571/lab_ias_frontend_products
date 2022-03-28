import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, of, Subject, Subscription } from 'rxjs';
import { mergeMap, takeUntil, tap } from 'rxjs/operators';
import { CategoryModel } from 'src/app/core/models/categories.model';
import { ProductModel } from 'src/app/core/models/product.model';
import { CategoryService } from 'src/app/shared/services/category-service/category.service';
import { ProductService } from 'src/app/shared/services/product-service/product.service';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.css']
})
export class ProductsListComponent implements OnInit, OnDestroy {
  
  captionText = 'List of products';
  listOfProducts: Array<ProductModel> = [];
  listOfCategories: CategoryModel[] = [];
  susbcribe$: Subscription;
  complete$ = new Subject <boolean>();

  constructor(private readonly productService: ProductService,
              private readonly categoryService: CategoryService) { }

  ngOnInit(): void {
    this.callServices();
    this.listenerChanges();
  }

  callServices(): void {
    this.getAllCategories().pipe(
      takeUntil(this.complete$),
      mergeMap( (categories: CategoryModel[]) => {
        return this.getAllProductos();
      })
    ).subscribe();
  }

  getAllCategories(): Observable<CategoryModel[]> {
    return this.categoryService.getCategory().pipe(
      takeUntil(this.complete$),
      tap((categories: CategoryModel[]) => {
        this.listOfCategories = [...categories];
      })
    );
  }

  getAllProductos(): Observable<ProductModel[]> {
    return this.productService.getAllProducts().pipe(
      takeUntil(this.complete$),
      tap((products: ProductModel[]) => {
        this.listOfProducts = [...products];
      })
    );
  }

  listenerChanges(): void {
    this.susbcribe$ = this.productService.getChanges().pipe(
      mergeMap( (change: boolean) => change ? this.getAllProductos() : of() )
    ).subscribe();
  }

  transformType(typeId: number): string | number {
    const categoryForChange = this.listOfCategories.find((category: CategoryModel) => category.id === Number(typeId));
    return categoryForChange ? categoryForChange.name : typeId;
  }

  totalPrice(price: number, discount: number): number{
    console.log('aqui',discount);
    let totalPrice = price - (price* (discount / 100));
    return totalPrice;
  }

  trackByItems(index: number, item: ProductModel): number {
    return item.productId;
  }

  ngOnDestroy(): void {
    this.susbcribe$.unsubscribe();
    this.complete$.next(true);
    this.complete$.unsubscribe();
  }


}
