import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

//rxjs
import { mergeMap, tap } from 'rxjs/operators';
import { Observable, Subscription } from 'rxjs';

//modules
import { DiscountModel } from 'src/app/core/models/discount.model';
import { ProductModel } from 'src/app/core/models/product.model';
import { CategoryModel } from 'src/app/core/models/categories.model';

//services
import { ProductService } from 'src/app/shared/services/product-service/product.service';
import { DiscountService } from 'src/app/shared/services/discount-service/discount.service';
import { CategoryService } from 'src/app/shared/services/category-service/category.service';
import { disableDebugTools } from '@angular/platform-browser';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css'],
})
export class ProductComponent implements OnInit {

  form: FormGroup;
  listOfDiscounts: DiscountModel[] = [];
  listOfCategories: CategoryModel[] = [];
  suscribe$: Subscription;

  constructor(
    private readonly fb: FormBuilder,
    private readonly productService: ProductService,
    private readonly discountService: DiscountService,
    private readonly categoryService: CategoryService
  ) {}

  ngOnInit(): void {
    this.createForm();
    this.getAllCategories();
    this.getAllDiscounts();
    this.listenerFieldTypeOfProduct();
  }

  /*onChange(typeOfProduct: number):void{
    this.getAllDiscounts().pipe(
      mergeMap( (discount: DiscountModel[]) => {
        this.checkDiscount(typeOfProduct);
        return discount
      })
    ).subscribe();
  }*/

  createForm(): void {
    this.form = this.fb.group({
      productId: ['', [Validators.required]],
      typeOfProduct: [undefined, [Validators.required]],
      name: ['', [Validators.required]],
      price: [0, [Validators.required]],
      discountapply: [0],
      discount: [0]
    });
  }

  onClickSave(): void {
    if (this.form.valid) {
      const product: ProductModel = { ...this.form.value };
      this.productService.saveProduct(product).subscribe(
        (product: ProductModel) => {
          // logic - if request is success
          this.form.reset();
          alert(`Se ha guardado con exito el usuario: ${product.productId} - ${product.name}` );
          this.productService.setChanges(true);
        }
      );
    } else {
      alert('El Formulario no se encuentra valido.');
    }
  }

  getAllDiscounts(): void{
    this.discountService.getAllDiscount().subscribe(
        (discounts: DiscountModel[]) => {
        this.listOfDiscounts = [...discounts];
      });
  }

  getAllCategories(): void{
    this.categoryService.getCategory().subscribe(
      (categories: CategoryModel[]) => {
        this.listOfCategories = [...categories];
      });
  }

  checkDiscount(typeOfProduct: string){
    for(let i = 0; i < this.listOfDiscounts.length ; i++){
      if(Number(typeOfProduct) === this.listOfDiscounts[i].idProduct){
        this.form.get('discountapply').setValue(this.listOfDiscounts[i].discountApply);
        this.form.get('discount').setValue(this.listOfDiscounts[i].value);
      } 
    }
  }

  listenerFieldTypeOfProduct(): void{
    this.suscribe$ = this.form.get('typeOfProduct').valueChanges.subscribe(
      (typeOfProduct: string) => {
        this.checkDiscount(typeOfProduct);
      }
    );
  }
}
