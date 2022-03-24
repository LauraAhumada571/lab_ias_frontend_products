import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { ProductModel } from 'src/app/core/models/product.model';
import { products } from '../../constants/products.constant';
import { tap } from 'rxjs/operators';

@Injectable()
export class ProductService {

  private readonly changes = new BehaviorSubject<boolean>(false);

  constructor() { }

  getAllProducts(): Observable<ProductModel[]> {
    return of(products).pipe(
      tap( () => {
        console.log('Executing query');
      })
    );
  }

  saveProduct(product: ProductModel): Observable<ProductModel> {
    return of(product).pipe(
      tap( () => {
        products.push(product);
        console.log('Executing save...');
      })
    );
  }

  getChanges(): Observable<boolean> {
    return this.changes.asObservable().pipe(
      tap( () => {
        console.log('Executing change...');
      })
    );
  }

  setChanges(value: boolean): void {
    this.changes.next(value);
  }

}
