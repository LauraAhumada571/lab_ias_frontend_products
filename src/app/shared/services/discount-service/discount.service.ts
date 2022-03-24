import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { DiscountModel } from 'src/app/core/models/discount.model';
import { discounts } from '../../constants/discoun.constant';

@Injectable({
  providedIn: 'root'
})
export class DiscountService {

  constructor() { }

  getAllDiscount(): Observable<DiscountModel[]> {
    return of([...discounts]);
  }
}
